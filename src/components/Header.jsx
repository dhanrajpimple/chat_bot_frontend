import React from 'react';
import styled from 'styled-components';
import { X, Minus, PawPrint } from 'lucide-react'; // Using PawPrint as mock 'Paw' icon if needed, or stick to simple text/icon

const HeaderContainer = styled.div`
  height: 60px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  color: white;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: ${({ theme }) => theme.borderRadius.lg};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.lg};
  flex-shrink: 0;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TitleText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 600;
  margin: 0;
`;

const Subtitle = styled.span`
  font-size: 12px;
  opacity: 0.9;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  color: white;
  opacity: 0.8;
  transition: opacity 0.2s;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Header = ({ onClose, onMinimize }) => {
    return (
        <HeaderContainer>
            <TitleArea>
                <PawPrint size={24} />
                <TitleText>
                    <Title>VetCare Assistant</Title>
                    <Subtitle>Ask me anything about pet care</Subtitle>
                </TitleText>
            </TitleArea>
            <Actions>
                <IconButton onClick={onMinimize} aria-label="Minimize chat">
                    <Minus size={20} />
                </IconButton>
                <IconButton onClick={onClose} aria-label="Close chat">
                    <X size={20} />
                </IconButton>
            </Actions>
        </HeaderContainer>
    );
};

export default Header;
