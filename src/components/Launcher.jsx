import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MessageCircle, X } from 'lucide-react';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(0, 123, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
`;

const Button = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.fast}, background-color ${({ theme }) => theme.transitions.fast};
  animation: ${pulse} 2s infinite;
  
  &:hover {
    transform: scale(1.05);
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primaryDark};
    outline-offset: 2px;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  font-size: 11px;
  font-weight: bold;
  height: 20px;
  min-width: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid white;
`;

const Launcher = ({ isOpen, toggle, unreadCount }) => {
    return (
        <Button
            onClick={toggle}
            aria-label={isOpen ? "Close chat" : "Open chat"}
            aria-expanded={isOpen}
        >
            {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            {!isOpen && unreadCount > 0 && <Badge>{unreadCount}</Badge>}
        </Button>
    );
};

export default Launcher;
