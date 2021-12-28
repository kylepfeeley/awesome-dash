import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { validateEmail } from "../../utils/functions";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const saltRounds = 10;

  const salt = bcrypt.genSaltSync(saltRounds);

  const { email, password } = req.body;

  let user: User;

  try {
    if (email && password.length < 8) {
      return res
        .status(400)
        .json({ err: "Your password should have at least 8 characters!" });
    }
    if (password && !validateEmail(email)) {
      return res.status(400).json({ err: "You should provide a valid email" });
    }
    if (!email && !password) {
      res.json({ err: "You should fill the form" });
      return;
    }

    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });

    const token = jwt.sign(
      { email: user.email, id: user.id, time: new Date() },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "6h",
      }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 6 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );
    res.json(user);
  } catch (err) {
    res.json({ err: "A user with that email already exists" });
    return;
  }
}
