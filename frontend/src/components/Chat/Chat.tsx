import { useState } from "react"
import ChatHeader from "./components/ChatHeader"
import ChatMessageInput from "./components/ChatMessageInput"
import ChatMessagesList from "./components/ChatMessagesList"
import type { Message } from "@/types/Message"


function Chat() {

  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (text:string) => {
    console.log(text)
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        role: prev.length % 2 === 0 ? "user" : "ai",
        content: text
      }
    ])
  }

  return (
    <>
    <div className='flex flex-col h-[100dvh] min-h-[300px] min-w-[150px]'>
    <ChatHeader />
    <ChatMessagesList messages={messages}/>
    <ChatMessageInput onSend={handleSend}/>
    </div>
    </>
  )
}

export default Chat