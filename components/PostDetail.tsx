import { Avatar, Box, Center, Divider, Flex, HStack, Image, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BlogAuthorProps, CommentProps, PostDetailProps } from '../types/props';
import { truncate } from '../utils/functions';
import { useMe } from '../utils/hooks';
import { AuthForm } from './AuthForm';
import CommentForm from './CommentForm';

export const BlogAuthor: React.FC<BlogAuthorProps> = props => {
    return (
        <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
            <Image
                borderRadius="full"
                boxSize="40px"
                src="https://100k-faces.glitch.me/random-image"
                alt={`Avatar of ${props.name}`}
            />
            <Text fontWeight="medium">{props.name}</Text>
            <Text>—</Text>
            <Text>{props.date}</Text>
        </HStack>
    );
};

const PostDetail = ({ pst, id, authorId }: PostDetailProps) => {
    const toast = useToast();
    const { me } = useMe();
    const [loggedIn, setLoggedIn] = useState(false);

    const color = useColorModeValue('white', 'gray.900');

    useEffect(() => {
        if (me) {
            // we check if the query useMe() return an empty Obj
            const isEmpty: boolean = Object.keys(me).length == 0;
            isEmpty ? setLoggedIn(false) : setLoggedIn(true);
        }
    }, [me]);

    return (
        <>
            <Flex align={'center'} justify={'center'}>
                <Stack spacing={8} mx={'auto'} w={1200} py={6} px={6}>
                    <Center py={6}>
                        <Box maxW={'800px'} w={'full'} bg={color} boxShadow={'2xl'} rounded={'md'} p={6} overflow={'hidden'}>
                            <Stack>
                                <Text
                                    color={'green.500'}
                                    textTransform={'uppercase'}
                                    fontWeight={800}
                                    fontSize={'sm'}
                                    letterSpacing={1.1}
                                >
                                    Post
                                </Text>

                                <Text color={'gray.500'}>{pst.text}</Text>
                            </Stack>

                            <Stack mt={10} direction={'row'} spacing={4} align={'center'}>
                                <Avatar src={''} name={truncate(pst.author.email)} alt={'Author'} />
                                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                    <Text fontWeight={600}>{pst.author.email}</Text>
                                    <Text color={'gray.500'}>{moment(pst.createdAt).format('Do MMMM YYYY')}</Text>
                                </Stack>
                            </Stack>

                            <Stack direction={'row'} justify={'center'} spacing={6}>
                                <Stack spacing={0} align={'center'}>
                                    <Text fontSize={'sm'} color={'gray.500'}>
                                        {pst.likes?.length}
                                    </Text>
                                    {/* <LikeButton childToParent={handleClick} id={id} authorId={authorId} /> */}
                                </Stack>
                            </Stack>

                        </Box>
                    </Center>
                </Stack>
            </Flex>

            {!loggedIn ? <AuthForm /> : <CommentForm id={pst.id} />}

            <Center height='20px'>
                <Divider width={'80%'} orientation='horizontal' />
            </Center>

            {/* we start the comment section here */}

            {pst.comments.map(({ author, text, createdAt }: CommentProps, i: number) => (
                <Flex key={i} align={'center'} justify={'center'}>
                    <Stack spacing={8} mx={'auto'} w={1200} px={6}>
                        <Center py={2}>
                            <Box maxW={'800px'} w={'full'} rounded={'md'} p={6} overflow={'hidden'}>
                                <Text as="p" fontSize="md" marginTop="2">
                                    {text}
                                </Text>
                                <BlogAuthor name={author.email} date={moment(createdAt).format('Do MMMM YYYY')} />
                            </Box>
                        </Center>
                    </Stack>
                </Flex>
            ))}
        </>
    );
};

export default PostDetail;
