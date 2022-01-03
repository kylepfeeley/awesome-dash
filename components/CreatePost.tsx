import { CheckIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { mutate } from 'swr';
import { fetcher } from '../utils/fetcher';
import { useMe, usePost } from '../utils/hooks';

export const CreatePost = () => {
  const toast = useToast();
  const [text, setText] = useState('');
  const [state, setState] = useState<'initial' | 'submitting' | 'success'>('initial');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);

  const { me } = useMe();
  const { post } = usePost();

  useEffect(() => {
    if (me) {
      // we check if the query useMe() return an empty object
      const isEmpty: boolean = Object.keys(me).length == 0;
      isEmpty ? setLoggedIn(false) : setLoggedIn(true);
    }
  }, [me]);

  return (
    <Flex minH={'20vh'} align={'center'} justify={'center'}>
      <Container
        maxW={'lg'}
        bg={useColorModeValue('white', 'whiteAlpha.100')}
        boxShadow={'xl'}
        rounded={'lg'}
        p={6}
        direction={'column'}
      >
        <Heading as={'h2'} fontSize={{ base: 'xl', sm: '2xl' }} textAlign={'center'} mb={5}>
          Wha do you have in mind?
        </Heading>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          as={'form'}
          spacing={'12px'}
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();

            try {
              const { data, error } = await fetcher('/api/post/create', {
                text: text
              });
              if (text.length < 1) {
                setError(true);
                toast({
                  position: 'top',
                  title: 'An error occured',
                  description: `${error}`,
                  status: 'error',
                  duration: 5000,
                  isClosable: true
                });
                return;
              }
              if (!loggedIn) {
                toast({
                  position: 'top',
                  title: 'An error occured',
                  description: `${error}`,
                  duration: 5000,
                  status: 'error',
                  isClosable: true
                });
                return;
              }
            } catch (error) {
              toast({
                position: 'top',
                title: 'An error occured',
                description: `${error}`,
                duration: 5000,
                status: 'error',
                isClosable: true
              });
            }

            setError(false);
            setState('submitting');

            setTimeout(() => {
              setState('success');
            }, 1000);
            setTimeout(() => {
              setState('initial');
              setText('');
            }, 2000);

            mutate('/api/post', [{ text: text, author: me }, ...post]);
          }}
        >
          <FormControl>
            <Input
              variant={'solid'}
              borderWidth={1}
              color={'gray.800'}
              _placeholder={{ color: 'gray.400' }}
              borderColor={useColorModeValue('gray.300', 'gray.700')}
              id={'text'}
              type={'text'}
              required
              placeholder={'your text here'}
              aria-label={'your text here'}
              value={text}
              disabled={state !== 'initial' && state !== 'success'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            ></Input>
          </FormControl>
          <FormControl w={{ base: '100%', md: '40%' }}>
            <Button
              colorScheme={state === 'success' ? 'green' : 'blue'}
              isLoading={state === 'submitting'}
              w={'100%'}
              type={state === 'success' ? 'button' : 'submit'}
            >
              {state === 'success' ? <CheckIcon /> : 'Submit'}
            </Button>
          </FormControl>
        </Stack>
      </Container>
    </Flex>
  );
};
