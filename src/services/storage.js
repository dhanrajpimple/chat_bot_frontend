const STORAGE_PREFIX = 'VET_CHAT_';

export const storage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(STORAGE_PREFIX + key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('LocalStorage error', e);
            return null;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage error', e);
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(STORAGE_PREFIX + key);
        } catch (e) {
            console.warn('LocalStorage error', e);
        }
    }
};
