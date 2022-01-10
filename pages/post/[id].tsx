import { GetServerSideProps } from "next";
import PostDetail from "../../components/PostDetail";
import prisma from "../../lib/prisma";
import { PostIdProps } from "../../types/props";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = Number(params?.id);
    const matchedPost = await prisma.post.findUnique({
        where: { id: id },
        include: {
            author: {
                select: {
                    email: true,
                    id: true
                }
            },
            likes: {
                select: {
                    id: true,
                    author: {
                        select: {
                            email: true,
                            id: true
                        }
                    }
                }
            },
            comments: {
                select: {
                    text: true,
                    id: true,
                    author: {
                        select: {
                            email: true,
                            id: true
                        }
                    }
                }
            }
        }
    });

    return {
        props: { post: matchedPost }
    }
}

const Detail = ({ post }: PostIdProps) => {
    return <PostDetail pst={post} id={post.id} authorId={post.authorId} />
}

export default Detail;