import { Button, Flex, Input, Stack, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiOutlineAnnotation } from "react-icons/hi";
import { fetcher } from "../utils/fetcher";
import { useMe } from "../utils/hooks";

const CommentForm = ({ id }) => {
    const [text, setText] = useState('');
    const router = useRouter();
    const { me } = useMe();
    const toast = useToast();
    const color = useColorModeValue('white', 'gray.700');

    return (
        <Flex align={'center'} justify={'center'} py={6}>
            <Stack
                w={600}
                boxShadow={'2xl'}
                bg={color}
                rounded={'xl'}
                p={5}
                spacing={2}
                align={'center'}
            >
                <HiOutlineAnnotation size={30} />
                <Stack align={'center'} spacing={2}>
                    <Text fontSize={'lg'} color={'gray.500'}>
                        Throw a comment!
                    </Text>
                </Stack>
                <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
                    <Input
                        value={text}
                        onChange={e => setText(e.target.value)}
                        type={'text'}
                        placeholder={'write your comment here'}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        bg={useColorModeValue('gray.100', 'gray.600')}
                        rounded={'full'}
                        border={0}
                        _focus={{
                            bg: useColorModeValue('gray.200', 'gray.800'),
                            outline: 'none'
                        }}
                    />
                    <Button disabled={text.length < 1} onClick={async e => {
                        e.preventDefault();
                        const { data, error } = await fetcher('/api/comment/create', {
                            text: text,
                            id
                        });
                        if (!me || !me.email) {
                            toast({
                                position: 'top',
                                title: 'An error occurred.',
                                description: `${error}`,
                                status: 'error',
                                duration: 5000,
                                isClosable: true
                            });
                            return;
                        }
                        router.push(`/post/${id}`, `/post/${id}`);
                        setText('');
                    }}
                        bg={'blue.400'}
                        rounded={'full'}
                        color={'white'}
                        flex={'1 0 auto'}
                        _hover={{ bg: 'blue.500' }}
                        _focus={{ bg: 'blue.500' }}>
                        Post
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}

export default CommentForm;