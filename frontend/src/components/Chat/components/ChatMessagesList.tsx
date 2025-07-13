import { ScrollArea } from "@/components/ui/scroll-area"
import type { Message } from "@/types/Message"


type Props = {
  messages: Message[]
}

export default function ChatMessagesList({messages}: Props) {
  return (
    <ScrollArea className="grow min-h-0">
      <div className="flex flex-col gap-2 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`
              rounded-md
              max-w-[clamp(50%,60ch,90%)]
              px-[clamp(0.5rem,1vw,1rem)] py-[clamp(0.25rem,0.75vw,0.5rem)]
              ${message.role === "user"
                ? "self-end bg-primary text-white"
                : "self-start bg-secondary"}
            `}
          >
            <p className="text-[clamp(0.75rem,3vw,1.0rem)]">{message.content}</p>
          </div>
        ))}
      </div>
    </ScrollArea>

  )
}

