import { useState, useRef, useEffect } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { ChatTabs } from "./ChatTabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot } from "lucide-react";

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

export const ChatPage = () => {
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const activeRoom = rooms.find(room => room.id === activeRoomId);
  
  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
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

  return (
    <div className="min-h-screen bg-gradient-cozy">
      <div className="container mx-auto p-4 h-screen flex flex-col">
        {/* Header */}
        <div className="bg-card rounded-xl p-4 shadow-cozy border border-border mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full p-2">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Cozy Chat</h1>
              <p className="text-muted-foreground">Your friendly AI companion</p>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex gap-4 min-h-0">
          {/* Sidebar with Chat Tabs */}
          <div className="w-80 shrink-0">
            <ChatTabs
              activeRoomId={activeRoomId}
              onRoomChange={setActiveRoomId}
              rooms={rooms}
              onCreateRoom={handleCreateRoom}
            />
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Messages */}
            <div className="flex-1 bg-chat-background rounded-xl p-4 shadow-cozy border border-border mb-4">
              <ScrollArea className="h-full" ref={scrollAreaRef}>
                <div className="space-y-1">
                  {activeRoom?.messages.map((message) => (
                    <ChatBubble
                      key={message.id}
                      message={message.content}
                      isAi={message.isAi}
                      timestamp={message.timestamp}
                      image={message.image}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Input */}
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};