import { join, isEmpty } from 'lodash-es'

export const getNativeName = (country: any) => {
  const nativeName = country.name?.nativeName
  if (isEmpty(nativeName)) {
    return ''
  }
  const languages = Object.keys(nativeName)
  return join(languages.map(lang => nativeName[lang]?.official ?? nativeName[lang]?.common), ', ')
}
