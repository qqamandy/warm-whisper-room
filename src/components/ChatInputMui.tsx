import { useState } from "react";
import { 
  Paper, 
  TextField, 
  IconButton, 
  Box, 
  Chip, 
  InputAdornment 
} from "@mui/material";
import { Send, Upload, Image as ImageIcon, Close } from "@mui/icons-material";

interface ChatInputProps {
  onSendMessage: (message: string, image?: File) => void;
  disabled?: boolean;
}

export const ChatInputMui = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || selectedImage) {
      onSendMessage(message, selectedImage || undefined);
      setMessage("");
      setSelectedImage(null);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      {selectedImage && (
        <Box sx={{ mb: 2 }}>
          <Chip
            icon={<ImageIcon />}
            label={selectedImage.name}
            onDelete={() => setSelectedImage(null)}
            deleteIcon={<Close />}
            variant="outlined"
            sx={{ maxWidth: '100%' }}
          />
        </Box>
      )}
      
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={disabled}
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <IconButton
                  component="label"
                  htmlFor="image-upload"
                  disabled={disabled}
                  size="small"
                >
                  <Upload />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        
        <IconButton
          type="submit"
          disabled={disabled || (!message.trim() && !selectedImage)}
          color="primary"
          sx={{ 
            minWidth: 48,
            height: 48,
          }}
        >
          <Send />
        </IconButton>
      </Box>
    </Paper>
  );
};