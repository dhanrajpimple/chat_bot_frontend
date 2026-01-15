import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../services/storage';
import { api } from '../services/api';

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [appointmentMode, setAppointmentMode] = useState(false);

    // Initialize session
    useEffect(() => {
        let sid = storage.get('sessionId');
        if (!sid) {
            sid = uuidv4();
            storage.set('sessionId', sid);
        }
        setSessionId(sid);

        const savedMessages = storage.get('history');
        if (savedMessages) {
            setMessages(savedMessages);
        }
    }, []);

    // Persist messages
    useEffect(() => {
        if (messages.length > 0) {
            // Keep last 50
            const recent = messages.slice(-50);
            storage.set('history', recent);
        }
    }, [messages]);

    const addMessage = useCallback((text, type) => {
        const msg = {
            id: uuidv4(),
            text,
            type,
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, msg]);
        return msg;
    }, []);

    const sendMessage = useCallback(async (text) => {
        if (!text.trim()) return;

        addMessage(text, 'user');
        setIsLoading(true);

        try {
            const config = window.VetChatbotConfig || {};
            const response = await api.sendMessage(text, config);

            // Add bot response
            addMessage(response.text, 'bot');

            // Trigger booking if backend flagged it
            if (response.isAppointmentFlow) {
                setAppointmentMode(true);
            }
        } catch (error) {
            addMessage(error.message || "Sorry, I'm having trouble connecting right now.", 'bot');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [addMessage]);

    const toggleChat = () => setIsOpen(prev => !prev);

    const closeBooking = () => setAppointmentMode(false);

    return {
        messages,
        isLoading,
        isOpen,
        setIsOpen,
        toggleChat,
        sendMessage,
        appointmentMode,
        setAppointmentMode,
        closeBooking
    };
};
