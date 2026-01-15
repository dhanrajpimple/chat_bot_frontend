import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Header from './Header';

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const WindowContainer = styled.div`
  position: absolute;
  bottom: 80px; /* Above launcher */
  right: 0;
  width: 380px;
  height: 600px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-origin: bottom right;
  animation: ${slideIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    z-index: 1000; /* Ensure on top in mobile */
  }
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

const Window = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <WindowContainer role="dialog" aria-modal="true">
            <Header onClose={onClose} onMinimize={onClose} />
            <ContentArea>
                {children}
            </ContentArea>
        </WindowContainer>
    );
};

export default Window;
