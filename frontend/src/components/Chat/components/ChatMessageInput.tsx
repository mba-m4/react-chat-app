import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  onSend: (text: string) => void;
};

export default function ChatMessageInput({ onSend }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="flex-none flex flex-col xs:flex-row gap-[clamp(0.25rem,1vw,0.5rem)] p-[clamp(0.5rem,2vw,1rem)]">
      <Input
        placeholder="メッセージを入力..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="text-[clamp(0.75rem,1.5vw,1rem)] sm:flex-grow h-[clamp(2rem,4vw,2.25rem)]"
      />
      <Button onClick={handleSubmit} className="h-[clamp(2rem,4vw,2.25rem)] px-[clamp(0.5rem,2vw,1rem)] py-[clamp(0.25rem,1vw,0.5rem)] sm:flex-none text-[clamp(0.75rem,1.5vw,1rem)]">
        送信
      </Button>
    </div>
  );
}