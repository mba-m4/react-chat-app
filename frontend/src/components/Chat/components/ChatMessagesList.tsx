import { ScrollArea } from "../../ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import type { Message } from "../../../types/Message"


type Props = {
  messages: Message[]
}

export default function ChatMessagesList({messages}: Props) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div
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
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

