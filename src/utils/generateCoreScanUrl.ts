import config from 'config';

export type UrlType = 'address' | 'token' | 'tx';

export const generateCoreScanUrl = <T extends UrlType = 'address'>(hash: string, urlType?: T) => {
  const safeUrlType = urlType || 'address';
  return `${config.coreScanUrl}/${safeUrlType}/${hash}`;
};

export default generateCoreScanUrl;
