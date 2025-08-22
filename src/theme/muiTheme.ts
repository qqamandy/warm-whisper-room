import { createTheme } from '@mui/material/styles';

export const cozyTheme = createTheme({
  palette: {
    primary: {
      main: 'hsl(25, 85%, 60%)', // Cozy pumpkin
      light: 'hsl(25, 85%, 70%)',
      dark: 'hsl(25, 85%, 50%)',
      contrastText: 'hsl(25, 10%, 15%)',
    },
    secondary: {
      main: 'hsl(31, 30%, 85%)', // Cream
      light: 'hsl(31, 30%, 95%)',
      dark: 'hsl(31, 30%, 75%)',
      contrastText: 'hsl(31, 10%, 15%)',
    },
    background: {
      default: 'hsl(31, 25%, 92%)', // Light cream background
      paper: 'hsl(0, 0%, 100%)', // Pure white for cards
    },
    text: {
      primary: 'hsl(31, 10%, 15%)', // Dark brown
      secondary: 'hsl(31, 8%, 45%)', // Muted brown
    },
    divider: 'hsl(31, 15%, 85%)',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 4px 12px -4px rgba(0, 0, 0, 0.1)',
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: '0 2px 8px -2px rgba(222, 142, 82, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 12px -2px rgba(222, 142, 82, 0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'hsl(31, 30%, 95%)',
            '& fieldset': {
              borderColor: 'hsl(31, 15%, 85%)',
            },
            '&:hover fieldset': {
              borderColor: 'hsl(25, 85%, 60%)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'hsl(25, 85%, 60%)',
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          margin: '4px',
          minHeight: 'auto',
          padding: '12px 16px',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: 'hsl(31, 10%, 15%)',
    },
    h6: {
      fontWeight: 500,
      color: 'hsl(31, 10%, 15%)',
    },
    body2: {
      color: 'hsl(31, 8%, 45%)',
    },
  },
});

// Custom colors for chat bubbles
export const chatColors = {
  userBubble: {
    background: 'hsl(25, 85%, 60%)', // Cozy pumpkin
    text: 'hsl(25, 10%, 15%)',
  },
  aiBubble: {
    background: 'hsl(31, 30%, 85%)', // Light cream
    text: 'hsl(31, 10%, 15%)',
  },
  chatBackground: 'hsl(31, 25%, 96%)', // Very light cream
};