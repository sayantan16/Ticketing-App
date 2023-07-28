import { useEffect } from 'react';
import userRequest from '../../hooks/user-request';
import Router from 'next/router';

export default () => {
  const { doRequest } = userRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you Out....</div>;
};
