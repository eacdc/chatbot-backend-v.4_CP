import React from 'react';
import { setLanguage, getCurrentLanguage, getAvailableLanguages } from '../translations';

const LanguageSwitcher = () => {
  const currentLang = getCurrentLanguage();
  const availableLanguages = getAvailableLanguages();
  
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    
    // Save to localStorage for persistence
    localStorage.setItem('preferredLanguage', newLang);
    
    // Update active language
    setLanguage(newLang);
    
    // Force page reload to apply translations
    window.location.reload();
  };
  
  // Only render if we have more than one language available
  if (availableLanguages.length <= 1) {
    return null;
  }
  
  return (
    <div className="language-switcher">
      <select 
        value={currentLang} 
        onChange={handleLanguageChange}
        className="bg-white border border-gray-300 text-gray-700 py-1 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {availableLanguages.map(lang => (
          <option key={lang} value={lang}>
            {lang === 'fr' ? 'Français' : 
             lang === 'en' ? 'English' : 
             lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher; 