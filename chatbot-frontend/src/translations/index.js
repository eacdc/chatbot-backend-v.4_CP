import fr from './fr';
import en from './en';

// Language object to store all translations
const translations = {
  fr,
  en
};

// Default language
let currentLanguage = 'fr';

/**
 * Get a translation by key path
 * @param {string} keyPath - Path to the translation key in dot notation (e.g. 'auth.login')
 * @param {object} replacements - Optional object with replacement values
 * @returns {string} - The translated text
 */
export const t = (keyPath, replacements = {}) => {
  const keys = keyPath.split('.');
  let translation = translations[currentLanguage];
  
  // Navigate through the keys
  for (const key of keys) {
    if (!translation || !translation[key]) {
      console.warn(`Translation missing for key: ${keyPath}`);
      return keyPath; // Return the key as fallback
    }
    translation = translation[key];
  }
  
  // Apply replacements if any
  if (typeof translation === 'string' && Object.keys(replacements).length > 0) {
    return Object.entries(replacements).reduce(
      (text, [key, value]) => text.replace(new RegExp(`{${key}}`, 'g'), value),
      translation
    );
  }
  
  return translation;
};

/**
 * Set the current language
 * @param {string} lang - Language code to set
 * @returns {boolean} - Whether the language was successfully set
 */
export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage = lang;
    return true;
  }
  return false;
};

/**
 * Get the current language code
 * @returns {string} - Current language code
 */
export const getCurrentLanguage = () => currentLanguage;

/**
 * Get available languages
 * @returns {string[]} - Array of available language codes
 */
export const getAvailableLanguages = () => Object.keys(translations);

export default {
  t,
  setLanguage,
  getCurrentLanguage,
  getAvailableLanguages
}; 