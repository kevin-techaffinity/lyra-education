import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { hasCookie } from 'cookies-next';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    if (!hasCookie('token')) {
      router.replace('/login');
    }
  }, [router]);
};

