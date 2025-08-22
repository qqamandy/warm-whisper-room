import { useState, useRef, useEffect } from "react";
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Avatar
} from "@mui/material";
import { SmartToy } from "@mui/icons-material";
import { ChatBubbleMui } from "./ChatBubbleMui";
import { ChatInputMui } from "./ChatInputMui";
import { ChatTabsMui } from "./ChatTabsMui";
import { chatColors } from "../theme/muiTheme";

interface Message {
  id: string;
  content: string;
  isAi: boolean;
  timestamp: string;
  image?: string;
}

interface ChatRoom {
  id: string;
  name: string;
  messages: Message[];
  lastMessage?: string;
}

export const ChatPageMui = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([
    {
      id: "general",
      name: "General Chat",
      messages: [
        {
          id: "1",
          content: "Hello! I'm your AI assistant. How can I help you today?",
          isAi: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      lastMessage: "Hello! I'm your AI assistant..."
    }
  ]);
  
  const [activeRoomId, setActiveRoomId] = useState("general");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const activeRoom = rooms.find(room => room.id === activeRoomId);
  
  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeRoom?.messages]);

  const handleSendMessage = async (content: string, image?: File) => {
    if (!activeRoom) return;
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let imageUrl: string | undefined;
    
    if (image) {
      // In a real app, you'd upload this to a server
      imageUrl = URL.createObjectURL(image);
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isAi: false,
      timestamp,
      image: imageUrl
    };
    
    // Simulate AI response
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: generateAIResponse(content, !!image),
      isAi: true,
      timestamp: new Date(Date.now() + 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === activeRoomId 
          ? { 
              ...room, 
              messages: [...room.messages, userMessage, aiMessage],
              lastMessage: content || "Image uploaded"
            }
          : room
      )
    );
  };
  
  const generateAIResponse = (userMessage: string, hasImage: boolean): string => {
    if (hasImage) {
      return "I can see the image you've shared! That's interesting. Could you tell me more about what you'd like to discuss regarding this image?";
    }
    
    const responses = [
      "That's a great question! Let me think about that...",
      "I understand what you're asking. Here's my perspective:",
      "Interesting point! I'd be happy to help with that.",
      "Thanks for sharing that with me. Here's what I think:",
      "I see what you mean. Let me provide some insights on that topic."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + " " + 
           "Feel free to ask me anything else you'd like to know!";
  };
  
  const handleCreateRoom = () => {
    const roomNumber = rooms.length + 1;
    const newRoom: ChatRoom = {
      id: `room-${roomNumber}`,
      name: `Chat Room ${roomNumber}`,
      messages: [
        {
          id: Date.now().toString(),
          content: `Welcome to Chat Room ${roomNumber}! I'm here to help you.`,
          isAi: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      lastMessage: `Welcome to Chat Room ${roomNumber}!`
    };
    
    setRooms(prev => [...prev, newRoom]);
    setActiveRoomId(newRoom.id);
  };

  const handleDeleteRoom = (roomId: string) => {
    // Don't allow deleting the last room
    if (rooms.length <= 1) return;
    
    setRooms(prev => prev.filter(room => room.id !== roomId));
    
    // If the deleted room was active, switch to another room
    if (activeRoomId === roomId) {
      const remainingRooms = rooms.filter(room => room.id !== roomId);
      if (remainingRooms.length > 0) {
        setActiveRoomId(remainingRooms[0].id);
      }
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: 'background.default',
      backgroundImage: `linear-gradient(135deg, ${chatColors.chatBackground} 0%, hsl(31, 20%, 90%) 100%)`
    }}>
      <Container maxWidth="xl" sx={{ py: 2, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <SmartToy />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1">
                Cozy Chat
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your friendly AI companion
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Main Chat Area */}
        <Box sx={{ flex: 1, display: 'flex', gap: 2, minHeight: 0 }}>
          {/* Sidebar with Chat Tabs */}
          <Box sx={{ width: 320, flexShrink: 0 }}>
            <ChatTabsMui
              activeRoomId={activeRoomId}
              onRoomChange={setActiveRoomId}
              rooms={rooms}
              onCreateRoom={handleCreateRoom}
              onDeleteRoom={handleDeleteRoom}
            />
          </Box>

          {/* Chat Area */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            {/* Messages */}
            <Paper 
              elevation={2} 
              sx={{ 
                flex: 1, 
                p: 2, 
                mb: 2, 
                backgroundColor: chatColors.chatBackground,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ flex: 1 }}>
                {activeRoom?.messages.map((message) => (
                  <ChatBubbleMui
                    key={message.id}
                    message={message.content}
                    isAi={message.isAi}
                    timestamp={message.timestamp}
                    image={message.image}
                  />
                ))}
                <div ref={messagesEndRef} />
              </Box>
            </Paper>

            {/* Input */}
            <ChatInputMui onSendMessage={handleSendMessage} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};