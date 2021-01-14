const LanguageCodes = {
  ENGLISH: '0',
  RUSSIAN: '1',
  GERMAN: '3',
  PORTUGUESE: '4',
  FRENCH: '5',
  SPANISH: '7',
  INDONESIAN: '11'
};

const Languages = [
  {
    langCode: LanguageCodes.ENGLISH,
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
    langCode: LanguageCodes.RUSSIAN,
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
    langCode: LanguageCodes.GERMAN,
    lang: 'german',
    overview: 'ÜBERBLICK',
    definition: 'DEFINITION',
    causes: 'URSACHEN',
    symptoms: 'SYMPTOME',
    diagnose: 'DIAGNOSE',
    prevention: 'VORBEUGEN',
    therapy: 'THERAPIE',
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
    langCode: LanguageCodes.PORTUGUESE,
    lang: 'portuguese',
    overview: 'Visão Geral',
    definition: 'Definição',
    causes: 'Causas',
    symptoms: 'Sintomas',
    diagnose: 'Diagnóstico e Exames',
    prevention: 'Prevenção',
    therapy: 'Terapia',
    risk: 'Fatores de risco',
    complications: 'Complicações possíveis',
    preparing: '',
    tests: '',
    lifestyle: '',
    alternative: '',
    coping: '',
    treatment: 'Tratamento e Cuidados',
    description: ''
  },
  {
    langCode: LanguageCodes.FRENCH,
    lang: 'french',
    overview: 'Aperçu',
    definition: 'Définition',
    causes: 'Causes',
    symptoms: 'Symptômes',
    diagnose: 'Diagnostic',
    prevention: 'prévention',
    therapy: 'Thérapie',
    risk: 'Des risques',
    complications: 'Complications possibles',
    preparing: '',
    tests: '',
    lifestyle: '',
    alternative: '',
    coping: '',
    treatment: 'Médication',
    description: 'La description'
  },
  {
    langCode: LanguageCodes.SPANISH,
    lang: 'spanish',
    overview: 'Visión general',
    definition: 'Definición',
    causes: 'Causas',
    symptoms: 'Síntomas',
    diagnose: 'Diagnóstico',
    prevention: 'Prevención',
    therapy: 'Terapia',
    risk: 'Factores de riesgo',
    complications: 'Complicaciones',
    preparing: '',
    tests: '',
    lifestyle: '',
    alternative: '',
    coping: '',
    treatment: 'Tratamiento',
    description: 'Descripción'
  },
  {
    langCode: LanguageCodes.INDONESIAN,
    lang: 'indonesian',
    overview: 'Gambaran',
    definition: 'Definisi',
    causes: 'Penyebab',
    symptoms: 'Gejala',
    diagnose: 'Diagnosis',
    prevention: 'Pencegahan',
    therapy: 'Terapi',
    risk: 'Faktor-faktor risiko',
    complications: '',
    preparing: '',
    tests: '',
    lifestyle: '',
    alternative: '',
    coping: '',
    treatment: 'Pengobatan',
    description: ''
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
  LanguageCodes,
  getLanguageInfo,
  getSectionHtml
};
