import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import MessageBubble from './MessageBubble';

const ListContainer = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 14px;
  text-align: center;
  padding: 20px;
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

const TypingWrapper = styled.div`
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.botMessageBg};
  border-radius: 12px;
  border-bottom-left-radius: 2px;
  align-self: flex-start;
  margin-bottom: 16px;
  margin-left: 40px; /* Offset for avatar alignment */
`;

const Dots = styled.div`
  display: flex;
  gap: 4px;
  
  span {
    width: 6px;
    height: 6px;
    background-color: ${({ theme }) => theme.colors.gray[600]};
    border-radius: 50%;
    animation: ${bounce} 1.4s infinite ease-in-out both;
    
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }
`;

const MessageList = ({ messages, isTyping }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    return (
        <ListContainer>
            {messages.length === 0 ? (
                <EmptyState>Hi! I'm your veterinary assistant. How can I help you today?</EmptyState>
            ) : (
                messages.map((msg, index) => (
                    <MessageBubble key={msg.id || index} message={msg} />
                ))
            )}

            {isTyping && (
                <TypingWrapper>
                    <Dots>
                        <span />
                        <span />
                        <span />
                    </Dots>
                </TypingWrapper>
            )}

            <div ref={bottomRef} />
        </ListContainer>
    );
};

export default MessageList;
