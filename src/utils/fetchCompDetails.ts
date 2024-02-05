export const addHttps = (url = '') => {
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  if (url.includes('www.')) {
    url = url.replace('www.', '');
  }
  if (url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  }

  if (url.startsWith('https://')) {
    return url;
  } else {
    return 'https://' + url;
  }
};

export const getUrlHost = (website_url) => {
  let url = new URL(website_url);
  return url.origin;
};
