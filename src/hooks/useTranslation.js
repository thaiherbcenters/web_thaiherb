import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';

// Hook สำหรับดึงคำแปล - ใช้งานง่ายและปลอดภัย
export const useTranslation = () => {
    const { language } = useLanguage();

    // ฟังก์ชันดึงคำแปล - รองรับ nested keys เช่น 'navbar.home'
    const t = (key, fallback = '') => {
        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // ถ้าหาไม่เจอ return fallback หรือ key
                return fallback || key;
            }
        }

        // ถ้า value เป็น object ที่มี language codes
        if (value && typeof value === 'object') {
            // ลอง return ภาษาที่เลือก, fallback เป็น Thai, หรือ key
            return value[language] || value['th'] || fallback || key;
        }

        return fallback || key;
    };

    return { t, language };
};

export default useTranslation;
