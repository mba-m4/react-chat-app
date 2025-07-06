import { ScrollArea } from "@/components/ui/scroll-area"


const messages = [
  {
    id: 1,
    content: "Hello, how are you?",
    role: "user",
  },
  {
    id: 2,
    content: "I'm fine, thank you!",
    role: "assistant",
  },
  {
    id: 3,
    content: "What's the best way to eat a?",
    role: "user",
  },
  {id:4,
    content: "I'm fine, thank you!",
    role: "assistant",
  },
  {id:5,
    content: "What's the best way to eat a?",
    role: "user",
  },
  
]


export default function ChatMessagesList() {
  return (
    <ScrollArea>
    <div className="flex flex-col gap-2 p-4">
        {messages.map((message) => (
        <div
            key={message.id}
            className={`rounded-md max-w-[30%] px-3 py-2 ${
            message.role === "user"
                ? "self-end bg-primary text-white"
                : "self-start bg-secondary"
            }`}
        >
            <p>{message.content}</p>
        </div>
        ))}
    </div>
    </ScrollArea>
  )
}

