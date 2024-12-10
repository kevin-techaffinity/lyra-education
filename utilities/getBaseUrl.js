import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { hostApi, appEnv } = publicRuntimeConfig;

export default function GetBaseUrl(host) {
  let api = `${hostApi}/v1`;
  if (appEnv !== 'development') {
    api = host ? `https://${host}/api/v1` : '/api/v1';
  }
  return api;
}
