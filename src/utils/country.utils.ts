import { join, isEmpty } from 'lodash-es'

export const getNativeName = (country: any) => {
  const nativeName = country.name?.nativeName
  if (isEmpty(nativeName)) {
    return ''
  }
  const languages = Object.keys(nativeName)
  return join(languages.map(lang => nativeName[lang]?.official ?? nativeName[lang]?.common), ', ')
}

export const getLanguages = (country: any) => {
  const languages = country.languages
  return languages && join(Object.keys(languages).map(key => languages[key]), ', ')
}

export const yesNoText = (value: boolean) => value ? 'Yes' : 'No'
