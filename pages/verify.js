'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { verify } from '../services/User';
import { setCookie, getCookie } from 'cookies-next';

const Verify = ({ login }) => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  useEffect(() => {
    (async () => {
      const { status, token: userToken, user } = await verify(token);

      if (status == 200) {
        setCookie('sanitizedMsisdn', user[0].email);

        login(userToken);
      }
    })();
  }, []);

  return <div>We are verifying your email, Please wait patiently!!!</div>;
};

export default Verify;
