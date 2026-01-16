import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

type Props = {
  onSend: (text: string) => void;
};

export default function ConversationMessageInput({ onSend }: Props) {
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleSubmit = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 日本語入力中の変換確定エンターは送信しない
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // KeyPressでもチェック
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <div className="flex-shrink-0 flex gap-3 p-4 bg-white border-t border-gray-200 shadow-sm">
      <Input
        placeholder="メッセージを入力..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        className="flex-1 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
      />
      <Button 
        onClick={handleSubmit} 
        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-6"
      >
        <Send className="w-4 h-4 mr-2" />
        送信
      </Button>
    </div>
  );
} 