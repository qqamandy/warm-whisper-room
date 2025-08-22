import { Box, Typography, Paper } from "@mui/material";
import { chatColors } from "../theme/muiTheme";

interface ChatBubbleProps {
  message: string;
  isAi: boolean;
  timestamp?: string;
  image?: string;
}

export const ChatBubbleMui = ({ message, isAi, timestamp, image }: ChatBubbleProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        mb: 2,
        justifyContent: isAi ? 'flex-start' : 'flex-end'
      }}
    >
      <Paper
        elevation={2}
        sx={{
          maxWidth: '80%',
          px: 2,
          py: 1.5,
          borderRadius: 2,
          backgroundColor: isAi ? chatColors.aiBubble.background : chatColors.userBubble.background,
          color: isAi ? chatColors.aiBubble.text : chatColors.userBubble.text,
          borderBottomLeftRadius: isAi ? 1 : 2,
          borderBottomRightRadius: isAi ? 2 : 1,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.15)',
          }
        }}
      >
        {image && (
          <Box sx={{ mb: 1 }}>
            <img 
              src={image} 
              alt="Uploaded content" 
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 8,
              }}
            />
          </Box>
        )}
        
        <Typography 
          variant="body2" 
          sx={{ 
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
            color: 'inherit'
          }}
        >
          {message}
        </Typography>
        
        {timestamp && (
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block',
              mt: 1,
              opacity: 0.7,
              color: 'inherit'
            }}
          >
            {timestamp}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};