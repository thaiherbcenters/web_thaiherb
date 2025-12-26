import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('language');
        return saved || 'th';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const languages = [
        { code: 'th', name: 'ไทย', flag: '🇹🇭' },
        { code: 'en', name: 'EN', flag: '🇬🇧' },
        { code: 'zh', name: '中文', flag: '🇨🇳' }
    ];

    const getCurrentLanguage = () => {
        return languages.find(lang => lang.code === language) || languages[0];
    };

    const value = {
        language,
        setLanguage,
        languages,
        getCurrentLanguage
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
