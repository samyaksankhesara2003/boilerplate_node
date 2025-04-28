import en from './locales/en.json';
import fr from './locales/fr.json';

type TranslationObject = {
  [key: string]: string | TranslationObject;
};

const translations: Record<string, TranslationObject> = {
  en,
  fr,
};

export function getTranslatedMessage(key: string, language: string = 'en') {
  return key
    .split('.')
    .reduce((obj: TranslationObject | string | undefined, part) => {
      if (typeof obj === 'object' && obj !== null) {
        return obj[part];
      }
      return undefined;
    }, translations[language]) || key;
};
