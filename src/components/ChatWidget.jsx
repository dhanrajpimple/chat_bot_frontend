import React, { useEffect } from 'react';
import styled from 'styled-components';
import Launcher from './Launcher';
import Window from './Window';
import MessageList from './MessageList';
import InputArea from './InputArea';
import BookingForm from './BookingForm';
import { useChat } from '../hooks/useChat';

const WidgetContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: ${({ theme }) => theme.zIndex.widget};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ChatWidget = () => {
    const {
        messages,
        isLoading,
        isOpen,
        setIsOpen,
        toggleChat,
        sendMessage,
        appointmentMode,
        closeBooking
    } = useChat();

    // Simple unread count logic (mock: reset on open)
    const unreadCount = 0; // To be implemented with state if needed

    return (
        <WidgetContainer>
            <Window isOpen={isOpen} onClose={() => setIsOpen(false)}>
                {appointmentMode ? (
                    <BookingForm onClose={closeBooking} />
                ) : (
                    <>
                        <MessageList messages={messages} isTyping={isLoading} />
                        <InputArea onSend={sendMessage} disabled={isLoading} />
                    </>
                )}
            </Window>
            <Launcher isOpen={isOpen} toggle={toggleChat} unreadCount={unreadCount} />
        </WidgetContainer>
    );
};

export default ChatWidget;
