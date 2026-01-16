# 🐾 Veterinary Chatbot UI (SDK)

This repository contains the frontend component of the Veterinary Chatbot. It is designed as a plug-and-play SDK that can be embedded into any website.

## ✨ Key Highlights
- **Single File SDK**: Bundles into a single JavaScript file (`chatbot.js`) for easy deployment.
- **Shadow DOM Isolation**: Uses Shadow DOM to prevent CSS conflicts with the host website.
- **Modern UI/UX**: Built with React and styled-components for a premium, responsive feel.
- **Conversational Booking**: A multi-step flow that turns appointment scheduling into a natural conversation.
- **Customizable**: Configurable via a global window object.

## 🛠️ Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Styled-components & Lucide-react icons
- **State Management**: Custom hooks (`useChat`)

## 📂 Directory Structure
```text
src/
├── components/       # Chat widget UI elements (Message, Input, Booking Form)
├── hooks/            # Logic for handling chat signals and UI state
├── services/         # API clients for backend communication
├── theme/            # Design tokens (Colors, Spacing, Typography)
├── App.jsx           # SDK Wrapper and Shadow DOM setup
└── main.jsx          # Custom element definition for the SDK
```

## ⚙️ Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Build the SDK
To generate the production-ready `chatbot.js` file:
```bash
npm run build
```
The output will be in the `dist/` directory.

## 🔌 Integration Guide

To add the chatbot to any website, include the following code before the closing `</body>` tag:

```html
<!-- Configuration -->
<script>
  window.VetChatbotConfig = {
    userId: "optional_user_id",
    userName: "John Doe",
    petName: "Buddy"
  };
</script>

<!-- SDK Script -->
<script src="https://your-domain.com/chatbot.js"></script>
```

## 🧪 Testing
Use `demo.html` to test the SDK integration locally. Simply open it in your browser while the backend is running.

## 📄 License
ISC
