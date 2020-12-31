const Languages = [
  {
    langCode: '0',
    lang: 'english',
    overview: 'OVERVIEW',
    definition: 'DEFINITION',
    symptoms: 'SYMPTOMS',
    causes: 'CAUSES',
    symptoms: 'SYMPTOMS',
    diagnose: 'DIAGNOSE',
    prevention: 'PREVENTION',
    therapy: 'THERAPY',
    risk: 'RISK',
    complications: 'COMPLICATIONS',
    preparing: 'PREPARING',
    tests: 'TESTS',
    lifestyle: 'LIFESTYLE',
    alternative: 'ALTERNATIVE',
    coping: 'COPING',
    treatment: '',
    description: ''
  },
  {
    langCode: '1',
    lang: 'russian',
    overview: '',
    definition: '',
    causes: 'ПРИЧИНЫ',
    symptoms: 'СИМПТОМЫ',
    diagnose: 'ДИАГНОСТИКА',
    prevention: 'ПРОФИЛАКТИКА',
    therapy: '',
    risk: 'ОПАСНОСТЬ',
    complications: '',
    preparing: '',
    tests: '',
    lifestyle: '',
    alternative: '',
    coping: '',
    treatment: 'ЛЕЧЕНИЕ',
    description: 'ОПИСАНИЕ'
  },
  {
    langCode: '3',
    lang: 'german',
    overview: '',
    definition: '',
    causes: '',
    symptoms: '',
    diagnose: '',
    prevention: '',
    therapy: '',
    risk: '',
    complications: '',
    preparing: '',
    tests: '',
    lifestyle: '',
    alternative: '',
    coping: '',
    treatment: '',
    description: ''
  },
  {
    langCode: '4',
    lang: 'portuguese',
    overview: '',
    definition: '',
    causes: '',
    symptoms: '',
    diagnose: '',
    prevention: '',
    therapy: '',
    risk: '',
    complications: '',
    preparing: '',
    tests: '',
    lifestyle: '',
    alternative: '',
    coping: '',
    treatment: '',
    description: ''
  },
  {
    langCode: '5',
    lang: 'french',
    overview: '',
    definition: '',
    causes: '',
    symptoms: '',
    diagnose: '',
    prevention: '',
    therapy: '',
    risk: '',
    complications: '',
    preparing: '',
    tests: '',
    lifestyle: '',
    alternative: '',
    coping: '',
    treatment: '',
    description: ''
  },
  {
    langCode: '7',
    lang: 'spanish',
    overview: '',
    definition: '',
    causes: '',
    symptoms: '',
    diagnose: '',
    prevention: '',
    therapy: '',
    risk: '',
    complications: '',
    preparing: '',
    tests: '',
    lifestyle: '',
    alternative: '',
    coping: '',
    treatment: '',
    description: ''
  },
  {
    langCode: '11',
    lang: 'indonesia',
    overview: '',
    definition: '',
    causes: '',
    symptoms: '',
    diagnose: '',
    prevention: '',
    therapy: '',
    risk: '',
    complications: '',
    preparing: '',
    tests: '',
    lifestyle: '',
    alternative: '',
    coping: ''
  }
];

const getLanguageInfo = langCode =>
  Languages.find(lang => lang.langCode === langCode);

const getSectionHtml = (content, key) => {
  const addedSuffixContent = `${content}<h2>`;
  if (!key) {
    return null;
  } else {
    const regex = new RegExp(`<h(2|3)>${key}.*?<h(2|3)>`);
    const sectionContent = addedSuffixContent.match(regex);
    return sectionContent && sectionContent.length > 0
      ? sectionContent[0].slice(0, -4)
      : null;
  }
};

module.exports = {
  Languages,
  getLanguageInfo,
  getSectionHtml
};
