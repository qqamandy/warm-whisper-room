import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string, image?: File) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
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

  return (
    <div className="bg-card rounded-xl p-4 shadow-cozy border border-border">
      {selectedImage && (
        <div className="mb-3 flex items-center gap-2 p-2 bg-muted rounded-lg">
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{selectedImage.name}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedImage(null)}
            className="ml-auto h-6 w-6 p-0"
          >
            ×
          </Button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <div className="flex-1">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={disabled}
            className="bg-input border-border focus:ring-primary resize-none min-h-[44px]"
          />
        </div>
        
        <div className="flex gap-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            id="image-upload"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => document.getElementById('image-upload')?.click()}
            disabled={disabled}
            className="h-11 w-11 border-border hover:bg-accent"
          >
            <Upload className="h-4 w-4" />
          </Button>
          
          <Button
            type="submit"
            disabled={disabled || (!message.trim() && !selectedImage)}
            className="h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};