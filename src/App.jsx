import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { GlobalStyles } from './theme/GlobalStyles';
import ChatWidget from './components/ChatWidget';

function App() {
  // Merge config theme if provided
  const config = window.VetChatbotConfig || {};
  const currentTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      ...(config.theme || {})
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <ChatWidget />
    </ThemeProvider>
  );
}

export default App;
