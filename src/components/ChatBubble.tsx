import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isAi: boolean;
  timestamp?: string;
  image?: string;
}

export const ChatBubble = ({ message, isAi, timestamp, image }: ChatBubbleProps) => {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isAi ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] px-4 py-3 rounded-2xl shadow-cozy transition-all duration-200 hover:shadow-warm",
        isAi 
          ? "bg-chat-ai text-chat-ai-foreground rounded-bl-md" 
          : "bg-chat-user text-chat-user-foreground rounded-br-md"
      )}>
        {image && (
          <img 
            src={image} 
            alt="Uploaded content" 
            className="max-w-full h-auto rounded-lg mb-2"
          />
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        {timestamp && (
          <p className="text-xs opacity-70 mt-2">
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
};