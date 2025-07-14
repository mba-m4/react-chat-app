import { useState, useEffect } from "react"
import ChatHeader from "./components/ChatHeader"
import ChatMessageInput from "./components/ChatMessageInput"
import ChatMessagesList from "./components/ChatMessagesList"
import type { Message } from "@/types/Message"

import { io } from "socket.io-client";

// サーバとの接続に必要
const socket = io("http://localhost:3000", { path: "/socket/" });

socket.on("connect", () => {
  console.log(`サーバとの接続確認：`);
  console.log(socket.connect());
});

function Chat() {

  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage= (text:string) => {
    console.log(text)
    const msg = {
      role: "user",
      content: text
    }
    socket.emit('send_message', msg)
  }

  useEffect(() => {
    const receiveMessage = (msg: Message) => {
      setMessages((prev) => [...prev, { 
        id: prev.length + 1,
        role: msg.role,
        content: msg.content
       }]);
    };

    socket.on("receive_message", receiveMessage);

    return () => {
      socket.off("receive_message", receiveMessage);
    };
  }, []);

  return (
    <>
    <div className='flex flex-col h-[100dvh] min-h-[300px] min-w-[150px]'>
    <ChatHeader />
    <ChatMessagesList messages={messages}/>
    <ChatMessageInput onSend={sendMessage}/>
    </div>
    </>
  )
}

export default Chat