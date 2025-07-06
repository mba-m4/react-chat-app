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
    <div className="flex-none flex flex-col xs:flex-row gap-2 p-4">
      <Input
        placeholder="メッセージを入力..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="text-[clamp(0.75rem,1.5vw,1rem)] sm:flex-grow"
      />
      <Button onClick={handleSubmit} className="h-9 px-4 py-2 sm:flex-none">
        送信
      </Button>
    </div>
  );
}