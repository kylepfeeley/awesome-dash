import { IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { CommentButtonProps } from "../types/props";

export const CommentButton = ({ id, comments }: CommentButtonProps) => {
    return (
        <Link passHref href={`/post/${id}`}>
            <IconButton aria-label="Search database" icon={<HiOutlineChatAlt2 />} />
        </Link>
    );
};