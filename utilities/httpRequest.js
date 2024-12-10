import fetch from 'isomorphic-unfetch';

import GetBaseUrl from './getBaseUrl';

export const get = async ({ request, params, host }) => {
  const baseUrl = GetBaseUrl(host);
  const uri = `${baseUrl}${request}?${params || ''}`;
  const res = await fetch(uri, {});
  return res.json();
};

export const post = async ({ request, params, body }) => {
  const baseUrl = GetBaseUrl();
  const uri = `${baseUrl}${request}?${params || ''}`;
  const res = await fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res.json();
};

export const patch = async ({ request, params, body }) => {
  const baseUrl = GetBaseUrl();
  const uri = `${baseUrl}${request}`;
  const res = await fetch(uri, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res.json();
};
