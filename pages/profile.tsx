import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMe } from '../utils/hooks';

const Profile = () => {
  const { me } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (me) {
      // we check if the query useMe() return an empty object
      const isEmpty: boolean = Object.keys(me).length == 0;

      isEmpty ? router.push('/') : null;
    }
  }, [me]);

  return <p>this is my profile page</p>;
};

export default Profile;
