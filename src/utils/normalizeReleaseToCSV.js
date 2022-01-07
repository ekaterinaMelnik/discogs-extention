const normalizeReleaseToCSV = (object) => {
  return Object.keys(object).reduce((csv, key) => {
    return csv + `${key}=${object[key]},`;
  }, '');
}

export default normalizeReleaseToCSV;
