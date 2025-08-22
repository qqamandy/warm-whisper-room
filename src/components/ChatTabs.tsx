import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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

export const ChatTabs = ({ activeRoomId, onRoomChange, rooms, onCreateRoom }: ChatTabsProps) => {
  return (
    <div className="bg-card rounded-xl p-4 shadow-cozy border border-border h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Chat Rooms</h2>
        <Button
          onClick={onCreateRoom}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => onRoomChange(room.id)}
            className={cn(
              "w-full text-left p-3 rounded-lg transition-all duration-200 hover:shadow-cozy group",
              activeRoomId === room.id
                ? "bg-primary text-primary-foreground shadow-warm"
                : "bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground"
            )}
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{room.name}</p>
                {room.lastMessage && (
                  <p className="text-xs opacity-75 truncate mt-1">
                    {room.lastMessage}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};