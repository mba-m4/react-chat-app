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
    <div className="flex gap-2 mt-4 p-4">
      <Input
        placeholder="メッセージを入力..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <Button onClick={handleSubmit}>送信</Button>
    </div>
  );
}