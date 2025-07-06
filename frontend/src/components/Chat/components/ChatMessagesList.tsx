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
  {id:6,
    content: "What's the best way to eat a?",
    role: "assistant",
  },
  {id:7,
    content: "What's the best way to eat a?",
    role: "user",
  },
  {id:8,
    content: "What's the best way to eat a?",
    role: "assistant",
  },
  {id:9,
    content: "What's the best way to eat a?",
    role: "user",
  },
  {id:10,
    content: "What's the best way to eat a?",
    role: "assistant",
  },
  
]


export default function ChatMessagesList() {
  return (
    <ScrollArea className="grow min-h-0">
      <div className="flex flex-col gap-2 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`
              rounded-md
              max-w-[clamp(70%,60ch,90%)]
              px-[clamp(0.5rem,1vw,1rem)] py-[clamp(0.25rem,0.75vw,0.5rem)]
              ${message.role === "user"
                ? "self-end bg-primary text-white"
                : "self-start bg-secondary"}
            `}
          >
            <p className="text-[clamp(1rem,1.5vw,1.3rem)]">{message.content}</p>
          </div>
        ))}
      </div>
    </ScrollArea>

  )
}

