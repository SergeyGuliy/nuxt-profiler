function fetchCodes() {
  const codesBasic = [
    { name: 'Ukraine', dial_code: '+380', code: 'UA' },
    { name: 'United Arab Emirates', dial_code: '+971', code: 'AE' },
    { name: 'United Kingdom', dial_code: '+44', code: 'GB' },
    { name: 'United States', dial_code: '+1', code: 'US' },
    { name: 'Uruguay', dial_code: '+598', code: 'UY' },
    { name: 'Uzbekistan', dial_code: '+998', code: 'UZ' },
    { name: 'Vanuatu', dial_code: '+678', code: 'VU' },
    { name: 'Wallis and Futuna', dial_code: '+681', code: 'WF' },
    { name: 'Yemen', dial_code: '+967', code: 'YE' },
    { name: 'Zambia', dial_code: '+260', code: 'ZM' },
    { name: 'Zimbabwe', dial_code: '+263', code: 'ZW' },
    { name: 'land Islands', dial_code: '', code: 'AX' },
    { name: 'Antarctica', dial_code: null, code: 'AQ' },
    { name: 'Bolivia, Plurinational State of', dial_code: '+591', code: 'BO' },
    { name: 'Brunei Darussalam', dial_code: '+673', code: 'BN' },
    { name: 'Cocos (Keeling) Islands', dial_code: '+61', code: 'CC' },
    {
      name: 'Congo, The Democratic Republic of the',
      dial_code: '+243',
      code: 'CD'
    },
    { name: "Cote d'Ivoire", dial_code: '+225', code: 'CI' },
    { name: 'Falkland Islands (Malvinas)', dial_code: '+500', code: 'FK' },
    { name: 'Guernsey', dial_code: '+44', code: 'GG' },
    { name: 'Holy See (Vatican City State)', dial_code: '+379', code: 'VA' },
    { name: 'Hong Kong', dial_code: '+852', code: 'HK' },
    { name: 'Iran, Islamic Republic of', dial_code: '+98', code: 'IR' },
    { name: 'Isle of Man', dial_code: '+44', code: 'IM' },
    { name: 'Jersey', dial_code: '+44', code: 'JE' },
    {
      name: "Korea, Democratic People's Republic of",
      dial_code: '+850',
      code: 'KP'
    },
    { name: 'Korea, Republic of', dial_code: '+82', code: 'KR' },
    { name: "Lao People's Democratic Republic", dial_code: '+856', code: 'LA' },
    { name: 'Libyan Arab Jamahiriya', dial_code: '+218', code: 'LY' },
    { name: 'Macao', dial_code: '+853', code: 'MO' },
    { name: 'Virgin Islands, U.S.', dial_code: '+1 340', code: 'VI' }
  ]
  const codes = []
  for (const i in codesBasic) {
    try {
      if (
        codesBasic[i].dial_code.length > 0 &&
        typeof codesBasic[i].dial_code === 'string'
      ) {
        const string = codesBasic[i].dial_code
        codes.push(string)
      } else {
        continue
      }
    } catch (e) {
      continue
    }
  }
  return codes
}

export { fetchCodes }
