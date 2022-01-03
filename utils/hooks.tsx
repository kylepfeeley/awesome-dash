import useSWR from 'swr';
import { fetcher } from './fetcher';

export function useMe() {
  const { data: me } = useSWR('/api/me', fetcher);
  return { me };
}

export function usePost() {
  const { data: post } = useSWR('/api/post', fetcher);
  return { post };
}
