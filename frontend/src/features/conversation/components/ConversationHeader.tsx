interface ConversationHeaderProps {
  conversationName?: string;
}

import { MessageCircle } from "lucide-react";

export default function ConversationHeader({ conversationName }: ConversationHeaderProps) {
  return (
    <div className="flex-none bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {conversationName || "会話"}
          </h3>
          <p className="text-sm text-gray-600">チャット</p>
        </div>
      </div>
    </div>
  );
} 