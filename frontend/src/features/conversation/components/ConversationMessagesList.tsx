import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { isUserMessage, isAIMessage } from "@/utils";
import type { Message } from "@/types";

interface ConversationMessagesListProps {
  messages: Message[];
}

export default function ConversationMessagesList({ messages }: ConversationMessagesListProps) {
  if (messages.length === 0) {
    return (
      <ScrollArea className="h-full">
        <div className="flex items-center justify-center h-full text-gray-500">
          <p className="text-sm">メッセージがありません</p>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-2 ${isUserMessage(message.role) ? "flex-row-reverse" : ""}`}>
            <Avatar className="h-8 w-8">
              <AvatarImage 
                src={isUserMessage(message.role) ? "https://github.com/shadcn.png" : undefined} 
                alt={isUserMessage(message.role) ? "ユーザーアバター" : "AIアバター"}
              />
              <AvatarFallback className={isUserMessage(message.role) ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}>
                {isUserMessage(message.role) ? "U" : "AI"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div
                className={`
                  rounded-md
                  max-w-[clamp(50%,60ch,90%)]
                  px-[clamp(0.5rem,1vw,1rem)] py-[clamp(0.25rem,0.75vw,0.5rem)]
                  ${isUserMessage(message.role)
                    ? "self-end bg-primary text-white"
                    : "self-start bg-secondary"}
                `}
              >
                <p className="text-[clamp(0.75rem,3vw,1.0rem)] break-words">{message.content}</p>
              </div>
              <p className={`text-xs text-gray-500 ${isUserMessage(message.role) ? "text-right" : "text-left"}`}>
                {message.createdAt.toLocaleTimeString('ja-JP', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
} 