import { storage } from './storage';

// Default URL for development, should be configured in production
const DEFAULT_API_URL = 'https://chat-bot-backend-4m88.onrender.com/api';

const getBaseUrl = () => {
    return  DEFAULT_API_URL;
};

const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        // 'X-Session-ID': storage.get('sessionId') // Backend expects sessionId in body currently, but headers are good practice too
    };
};

export const api = {
    async sendMessage(text, context = {}) {
        const baseUrl = getBaseUrl();
        const sessionId = storage.get('sessionId');

        try {
            const response = await fetch(`${baseUrl}/chat/message`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    sessionId,
                    message: text,
                    ...context
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Network response was not ok');
            }

            const data = await response.json();

            // Transform backend response to frontend message format
            return {
                text: data.data.message,
                timestamp: new Date().toISOString(),
                type: 'bot',
                isAppointmentFlow: data.data.isAppointmentFlow || false
            };
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async submitAppointment(data) {
        const baseUrl = getBaseUrl();
        const sessionId = storage.get('sessionId');

        try {
            const response = await fetch(`${baseUrl}/appointments`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    sessionId,
                    ...data
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Booking failed');
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};
