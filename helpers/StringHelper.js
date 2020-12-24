const generateDiseaseKeyword = originalString => {
  return (
    originalString &&
    filterSpecialCharacters(originalString)
      .replace(/\s+/gi, '')
      .replace(/[`~!@#$%^&*()_|—+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
  );
};

const filterSpecialCharacters = originalString => {
  return (
    originalString &&
    originalString
      .replace(/\s{2,} /gi, '')
      .replace(/(\r\n\t|\n|\r|\t)/gm, '')
      .replace(/<\w{1,}>/gi, '')
      .replace(/<\/\w{1,}>/gi, '')
  );
};

module.exports = {
  generateDiseaseKeyword,
  filterSpecialCharacters
};
