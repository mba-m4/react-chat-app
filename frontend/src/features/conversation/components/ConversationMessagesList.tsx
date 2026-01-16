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
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-amber-500" />
          </div>
          <p className="text-lg font-medium mb-2">メッセージがありません</p>
          <p className="text-sm text-gray-400">新しい会話を始めてみましょう</p>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-4 p-6">
        {messages
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          .map((message) => (
          <div key={message.id} className={`flex gap-3 ${isUserMessage(message.role) ? "flex-row-reverse" : ""}`}>
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={isUserMessage(message.role) ? "https://github.com/shadcn.png" : undefined} 
                alt={isUserMessage(message.role) ? "ユーザーアバター" : "AIアバター"}
              />
              <AvatarFallback className={isUserMessage(message.role) ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white font-semibold" : "bg-gradient-to-br from-slate-400 to-gray-500 text-white font-semibold"}>
                {isUserMessage(message.role) ? "U" : "AI"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <div
                className={`
                  rounded-2xl px-4 py-3 shadow-sm
                  ${isUserMessage(message.role)
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white ml-auto"
                    : "bg-white border border-gray-200 text-gray-900"}
                  ${isUserMessage(message.role)
                    ? 'max-w-[clamp(50%,60ch,85%)]'  // ユーザーメッセージ（右寄せ）
                    : 'max-w-[clamp(40%,55ch,80%)]'   // AIメッセージ（左寄せ）
                  }
                `}
              >
                <p className="text-sm break-words leading-relaxed whitespace-normal">{message.content}</p>
              </div>
              <p className={`text-xs text-gray-400 ${isUserMessage(message.role) ? "text-right mr-1" : "text-left ml-1"}`}>
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