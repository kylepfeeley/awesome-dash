import { LockIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { mutate } from 'swr';
import { fetcher } from '../utils/fetcher';

const LogoutButton = () => {
  return (
    <Button
      onClick={async () => {
        const { data, error } = await fetcher('/api/logout', {});
        if (error) {
          return;
        }
        await mutate('/api/me');
      }}
      variant={'solid'}
      colorScheme={'twitter'}
      size={'md'}
      mr={4}
      leftIcon={<LockIcon />}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
