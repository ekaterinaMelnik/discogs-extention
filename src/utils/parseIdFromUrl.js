const parseIdFromUrl = (url = '') => {
  const pathList = url.split('/');
  const releasePath = pathList[pathList.length - 1];

  return releasePath.split('-')[0]
}

export default parseIdFromUrl;
