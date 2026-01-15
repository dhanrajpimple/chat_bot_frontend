export const theme = {
    colors: {
        primary: '#007BFF', // Default blue, can be overridden
        primaryDark: '#0056b3',
        secondary: '#6c757d',
        background: '#ffffff',
        text: '#212529',
        textLight: '#f8f9fa',
        border: '#dee2e6',
        error: '#dc3545',
        success: '#28a745',
        gray: {
            100: '#f8f9fa',
            200: '#e9ecef',
            300: '#dee2e6',
            400: '#ced4da',
            500: '#adb5bd',
            600: '#6c757d',
        },
        botMessageBg: '#f1f0f0',
        userMessageBg: '#007BFF',
        userMessageText: '#ffffff',
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        round: '50%',
    },
    shadows: {
        sm: '0 2px 4px rgba(0,0,0,0.1)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
        lg: '0 10px 15px rgba(0,0,0,0.1)',
    },
    typography: {
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontSize: {
            sm: '12px',
            md: '14px',
            lg: '16px',
        }
    },
    transitions: {
        fast: '0.2s ease',
        normal: '0.3s ease',
    },
    zIndex: {
        widget: 999999,
    }
};
