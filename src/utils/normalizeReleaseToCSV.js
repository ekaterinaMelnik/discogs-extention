const RELEASE_KEYS_ORDER = ['artists', 'title', 'year', '', '•', 'country', '•', 'label', '•', '', '', 'uri'];

const normalizeReleaseToCSV = (release = {}) => {
  return RELEASE_KEYS_ORDER.reduce((csv, key) => {
    const value = release[key] || '';
    return csv + value + '\t';
  }, '');
}

export default normalizeReleaseToCSV;
