const Languages = [
  {
    id: '0',
    lang: 'english',
    overview: 'OVERVIEW',
    definition: 'DEFINITION',
    symptoms: '',
    causes: 'CAUSES',
    symptoms: 'SYMPTOMS',
    diagnose: 'DIAGNOSE',
    prevention: 'PREVENT',
    therapy: 'THERAPY'
  },
  {
    id: '1',
    lang: 'russian',
    overview: 'OVERVIEW',
    definition: 'DEFINITION',
    causes: 'ПРИЧИНЫ',
    symptoms: 'СИМПТОМЫ',
    diagnose: 'ДИАГНОСТИКА',
    prevention: 'PREVENT',
    therapy: 'THERAPY'
  },
  {
    id: '3',
    lang: 'german',
    overview: 'OVERVIEW',
    definition: 'DEFINITION',
    causes: 'CAUSES',
    symptoms: 'SYMPTOMS',
    diagnose: 'DIAGNOSE',
    prevention: 'PREVENT',
    therapy: 'THERAPY'
  },
  {
    id: '4',
    lang: 'portuguese',
    overview: 'OVERVIEW',
    definition: 'DEFINITION',
    causes: 'CAUSES',
    symptoms: 'SYMPTOMS',
    diagnose: 'DIAGNOSE',
    prevention: 'PREVENT',
    therapy: 'THERAPY'
  },
  {
    id: '5',
    lang: 'french',
    overview: 'OVERVIEW',
    definition: 'DEFINITION',
    causes: 'CAUSES',
    symptoms: 'SYMPTOMS',
    diagnose: 'DIAGNOSE',
    prevention: 'PREVENT',
    therapy: 'THERAPY'
  },
  {
    id: '7',
    lang: 'spanish',
    overview: 'OVERVIEW',
    definition: 'DEFINITION',
    causes: 'CAUSES',
    symptoms: 'SYMPTOMS',
    diagnose: 'DIAGNOSE',
    prevention: 'PREVENT',
    therapy: 'THERAPY'
  },
  {
    id: '11',
    lang: 'indonesin',
    overview: 'OVERVIEW',
    definition: 'DEFINITION',
    causes: 'CAUSES',
    symptoms: 'SYMPTOMS',
    diagnose: 'DIAGNOSE',
    prevention: 'PREVENT',
    therapy: 'THERAPY'
  }
];

const getLanguageInfo = id => Languages.find(lang => lang.id === id);

module.exports = {
  Languages,
  getLanguageInfo
};
