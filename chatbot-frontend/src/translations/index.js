import fr from './fr';
import en from './en';

// Language object to store all translations
const translations = {
  fr,
  en
};

// Default language - set to English
let currentLanguage = 'en';

// Check if we're on a mobile device
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
console.log('Translation module loaded - Is mobile:', isMobile);

/**
 * Get a translation by key path
 * @param {string} keyPath - Path to the translation key in dot notation (e.g. 'auth.login')
 * @param {object} replacements - Optional object with replacement values
 * @returns {string} - The translated text
 */
export const t = (keyPath, replacements = {}) => {
  const keys = keyPath.split('.');
  let translation = translations[currentLanguage];
  
  // For backup if translation is missing in current language
  let fallbackTranslation = translations['en']; // Always use English as fallback
  
  // Navigate through the keys
  for (const key of keys) {
    if (!translation || !translation[key]) {
      console.warn(`Translation missing for key: ${keyPath}`);
      
      // Try to use English fallback
      for (const fallbackKey of keys) {
        if (!fallbackTranslation || !fallbackTranslation[fallbackKey]) {
          return keyPath; // Return the key as last resort fallback
        }
        fallbackTranslation = fallbackTranslation[fallbackKey];
      }
      return fallbackTranslation; // Return English translation as fallback
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
    console.log(`Language set to: ${lang}`);
    return true;
  }
  console.warn(`Failed to set language: ${lang} - not available`);
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