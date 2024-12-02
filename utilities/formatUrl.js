import GetBaseUrl from './getBaseUrl';

export default function FormatUrl(url, token) {
  const baseUrl = GetBaseUrl();
  return `${baseUrl}${url}${token ? `&token=${token}` : ''}`;
}
