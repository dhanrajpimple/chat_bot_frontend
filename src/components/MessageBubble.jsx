import React from 'react';
import styled, { keyframes } from 'styled-components';
import { User, PawPrint } from 'lucide-react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const BubbleContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: flex-end;
  animation: ${fadeIn} 0.3s ease-out;
  flex-direction: ${({ isUser }) => isUser ? 'row-reverse' : 'row'};
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme, isUser }) => isUser ? theme.colors.primary : theme.colors.gray[200]};
  color: ${({ theme, isUser }) => isUser ? 'white' : theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ isUser }) => isUser ? '0 0 0 8px' : '0 8px 0 0'};
  flex-shrink: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
  max-width: 80%;
`;

const MessageText = styled.div`
  background-color: ${({ theme, isUser }) => isUser ? theme.colors.userMessageBg : theme.colors.botMessageBg};
  color: ${({ theme, isUser }) => isUser ? theme.colors.userMessageText : theme.colors.text};
  padding: 12px 16px;
  border-radius: 12px;
  border-bottom-right-radius: ${({ isUser }) => isUser ? '2px' : '12px'};
  border-bottom-left-radius: ${({ isUser }) => isUser ? '12px' : '2px'};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const Timestamp = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-top: 4px;
`;

const MessageBubble = ({ message }) => {
    const { text, type, timestamp } = message;
    const isUser = type === 'user';

    // Format timestamp (assume ISO string or Date object)
    const timeString = timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    return (
        <BubbleContainer isUser={isUser}>
            <Avatar isUser={isUser}>
                {isUser ? <User size={16} /> : <PawPrint size={16} />}
            </Avatar>
            <ContentWrapper isUser={isUser}>
                <MessageText isUser={isUser}>{text}</MessageText>
                <Timestamp>{timeString}</Timestamp>
            </ContentWrapper>
        </BubbleContainer>
    );
};

export default MessageBubble;
