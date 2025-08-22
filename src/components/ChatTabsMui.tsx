import { Paper, Typography, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Add, Chat } from "@mui/icons-material";

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
}

export const ChatTabsMui = ({ activeRoomId, onRoomChange, rooms, onCreateRoom }: ChatTabsProps) => {
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
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};