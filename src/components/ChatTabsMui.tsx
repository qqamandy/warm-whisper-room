import { Paper, Typography, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { Add, Chat, Delete } from "@mui/icons-material";
import { useState } from "react";

interface ChatRoom {
  id: string;
  name: string;
  lastMessage?: string;
}

interface ChatTabsProps {
  activeRoomId: string;
  onRoomChange: (roomId: string) => void;
  rooms: ChatRoom[];
  onCreateRoom: () => void;
  onDeleteRoom: (roomId: string) => void;
}

export const ChatTabsMui = ({ activeRoomId, onRoomChange, rooms, onCreateRoom, onDeleteRoom }: ChatTabsProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

  const handleDeleteClick = (roomId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setRoomToDelete(roomId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (roomToDelete) {
      onDeleteRoom(roomToDelete);
      setDeleteDialogOpen(false);
      setRoomToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setRoomToDelete(null);
  };
  return (
    <Paper elevation={2} sx={{ p: 2, height: 'fit-content' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" component="h2">
          Chat Rooms
        </Typography>
        <IconButton 
          onClick={onCreateRoom}
          color="primary"
          size="small"
          sx={{
            '&:hover': {
              backgroundColor: 'primary.light',
              color: 'primary.contrastText',
            }
          }}
        >
          <Add />
        </IconButton>
      </Box>
      
      <List sx={{ p: 0 }}>
        {rooms.map((room) => (
          <ListItem key={room.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => onRoomChange(room.id)}
              selected={activeRoomId === room.id}
              sx={{
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                pr: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                  '& .MuiListItemText-secondary': {
                    color: 'primary.contrastText',
                    opacity: 0.8,
                  }
                },
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Chat />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 500,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {room.name}
                  </Typography>
                }
                secondary={
                  room.lastMessage && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'block',
                        mt: 0.5
                      }}
                    >
                      {room.lastMessage}
                    </Typography>
                  )
                }
              />
              {rooms.length > 1 && (
                <IconButton
                  size="small"
                  onClick={(e) => handleDeleteClick(room.id, e)}
                  sx={{
                    ml: 1,
                    opacity: 0.7,
                    '&:hover': {
                      opacity: 1,
                      backgroundColor: 'error.main',
                      color: 'error.contrastText',
                    }
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Chat Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this chat room? This action cannot be undone and all messages will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};