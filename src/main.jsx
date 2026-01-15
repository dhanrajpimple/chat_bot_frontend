import React from 'react';
import { createRoot } from 'react-dom/client';
import { StyleSheetManager } from 'styled-components';
import App from './App';

function init() {
  const containerId = 'vet-chatbot-host';
  if (document.getElementById(containerId)) return; // Prevent multiple instances

  const container = document.createElement('div');
  container.id = containerId;
  document.body.appendChild(container);

  // Attach Shadow DOM
  const shadow = container.attachShadow({ mode: 'open' });
  const mountPoint = document.createElement('div');
  shadow.appendChild(mountPoint);

  // Render with StyleSheetManager targeting the shadow root
  const root = createRoot(mountPoint);
  root.render(
    <React.StrictMode>
      <StyleSheetManager target={shadow}>
        <App />
      </StyleSheetManager>
    </React.StrictMode>
  );
}

// Auto-initialize unless configured otherwise
// Wait for DOM content to be loaded if not already
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Expose init for manual control if needed
window.VetChatbot = { init };
