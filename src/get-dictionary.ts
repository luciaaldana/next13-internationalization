import 'server-only';
import { lngConfig, Locale } from './lng-config';

type DictionaryFunction = (section: string) => Promise<any>;

const dictionaries: { [key: string]: DictionaryFunction } = {};

lngConfig.locales.forEach((language) => {
  dictionaries[language] = (section: string) =>
    import(`./dictionaries/${language}/${section}.json`).then((module) => module.default);
});

// Agregar una función para el idioma predeterminado ('en') que no necesita 'section'
dictionaries.en = (section: string) => import(`./dictionaries/en/${section}.json`).then((module) => module.default);

export const getDictionary = async (locale: Locale, section: string) => {
  const dictionaryFunction = dictionaries[locale];
  if (dictionaryFunction) {
    return dictionaryFunction(section);
  } else {
    // Si el idioma no está disponible, devolver el diccionario en inglés por defecto
    return dictionaries.en(section);
  }
};
