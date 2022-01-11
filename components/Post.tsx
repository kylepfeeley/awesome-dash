import { Avatar, Box, Center, Flex, Progress, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import moment from 'moment';
import { useCallback } from 'react';
import { PostProps } from '../types/props';
import { truncate } from '../utils/functions';
import { useMe, usePost } from '../utils/hooks';
import { CommentButton } from './CommentButton';
import { DeleteButton } from './DeleteButton';
import LikeButton from './LikeButton';
import { ReadmoreButton } from './ReadMoreButton';

export const Post = () => {
    const toast = useToast();
    const { post } = usePost();
    const { me } = useMe();
    const color = useColorModeValue('white', 'gray.900');

    const handleClick = useCallback(
        errorFromChild => {
            const isErrorAsString = typeof errorFromChild === 'string';
            const likedSuccess = 'Liked with success!';
            toast({
                position: 'top',
                title: `${isErrorAsString ? `Warning` : `Success`}`,
                description: `${isErrorAsString ? `${errorFromChild}` : `${likedSuccess}`}`,
                status: `${isErrorAsString ? `warning` : `success`}`,
                duration: 5000,
                isClosable: true
            })
        },
        [toast]
    )

    return post ? (
        <Flex align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} w={1200} py={12} px={6}>
                {post.map(({ id, author, authorId, text, createdAt, comments, likes }: PostProps, i: number) => (
                    <Center key={i} py={6}>
                        <Box maxW={'800px'} w={'full'} bg={color} boxShadow={'2xl'} rounded={'md'} p={6} overflow={'hidden'}>
                            <Stack>
                                <Text
                                    color={'green.500'}
                                    textTransform={'uppercase'}
                                    fontWeight={800}
                                    fontSize={'sm'}
                                    letterSpacing={1.1}>
                                    Post
                                </Text>
                                <Text color={'gray.500'}>{text}</Text>
                            </Stack>
                            <Stack mt={10} direction={'row'} spacing={4} align={'center'}>
                                <Avatar src='' name={truncate(author.email)} alt={'Author'} />
                                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                    <Text fontWeight={600}>{author.email}</Text>
                                    <Text color={'gray.500'}>{moment(createdAt).format('Do MMMM YYYY')}</Text>
                                </Stack>
                            </Stack>

                            <Stack mt={8} direction={'row'} spacing={6}>
                                {me && author.id === me.id && <DeleteButton id={id} post={post} />}
                            </Stack>

                            <Stack direction={'row'} justify={'center'} spacing={6}>
                                <Stack spacing={0} align={'center'}>
                                    <Text fontSize={'sm'} color={'gray.500'}>
                                        {likes?.length}
                                    </Text>
                                    <LikeButton childToParent={handleClick} id={id} authorId={authorId} />
                                </Stack>
                                <Stack spacing={0} align={'center'}>
                                    <Text fontSize={'sm'} color={'gray.500'}>
                                        {comments?.length}
                                    </Text>
                                    <CommentButton id={id} comments={comments} />
                                </Stack>
                            </Stack>

                            <ReadmoreButton id={id} comments={comments} />
                        </Box>
                    </Center>
                ))}
            </Stack>
        </Flex>
    ) : (
        <Progress size={'xs'} isIndeterminate />
    );
};
