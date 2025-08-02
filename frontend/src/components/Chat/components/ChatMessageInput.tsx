import { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

type Props = {
  onSend: (text: string) => void;
};

export default function ChatMessageInput({ onSend }: Props) {
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleSubmit = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('KeyDown:', e.key, 'state isComposing:', isComposing);
    // 日本語入力中の変換確定エンターは送信しない
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('KeyPress:', e.key, 'state isComposing:', isComposing);
    // KeyPressでもチェック
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCompositionStart = () => {
    console.log('CompositionStart');
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    console.log('CompositionEnd');
    setIsComposing(false);
  };

  return (
    <div className="flex-none flex flex-col xs:flex-row gap-[clamp(0.25rem,1vw,0.5rem)] p-[clamp(0.5rem,2vw,1rem)]">
      <Input
        placeholder="メッセージを入力..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        className="text-[clamp(0.75rem,1.5vw,1rem)] sm:flex-grow h-[clamp(2rem,4vw,2.25rem)]"
      />
      <Button onClick={handleSubmit} className="h-[clamp(2rem,4vw,2.25rem)] px-[clamp(0.5rem,2vw,1rem)] py-[clamp(0.25rem,1vw,0.5rem)] sm:flex-none text-[clamp(0.75rem,1.5vw,1rem)]">
        送信
      </Button>
    </div>
  );
}