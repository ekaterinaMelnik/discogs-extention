const normalizeReleaseToCSV = (object = test) => {
  return Object.keys(object).reduce((csv, key) => {
    return csv + `${key}=${object[key]}` + '\t';
  }, '');
}

export default normalizeReleaseToCSV;
