import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { hostApi, appEnv } = publicRuntimeConfig;

const apiBase = (host) => {
  let api = `${hostApi}/v1`;

  if (appEnv !== 'development') {
    api = host ? `https://${host}/api/v1` : '/api/v1';
  }
  return api;
};

export const get = async ({ request, params, host }) => {
  const uri = `${apiBase(host)}${request}?${params || ''}`;
  const res = await fetch(uri, {});
  return res.json();
};

export const post = async ({ request, params, body }) => {
  const uri = `${apiBase()}${request}?${params || ''}`;
  const res = await fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res.json();
};
