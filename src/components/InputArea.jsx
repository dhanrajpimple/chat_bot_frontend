import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Send } from 'lucide-react';

const InputContainer = styled.div`
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const TextArea = styled.textarea`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 10px 16px;
  font-size: 14px;
  resize: none;
  outline: none;
  max-height: 80px;
  min-height: 40px;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[500]};
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme, disabled }) => disabled ? theme.colors.gray[300] : theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme, disabled }) => disabled ? theme.colors.gray[300] : theme.colors.primaryDark};
  }
`;

const InputArea = ({ onSend, disabled }) => {
    const [text, setText] = useState('');
    const textareaRef = useRef(null);

    // Auto-resize
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset to shrink if needed
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 80) + 'px';
        }
    }, [text]);

    const handleSend = () => {
        if (text.trim() && !disabled) {
            onSend(text.trim());
            setText('');
            // Reset height
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <InputContainer>
            <TextArea
                ref={textareaRef}
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                rows={1}
            />
            <SendButton onClick={handleSend} disabled={!text.trim() || disabled} aria-label="Send message">
                <Send size={18} />
            </SendButton>
        </InputContainer>
    );
};

export default InputArea;
