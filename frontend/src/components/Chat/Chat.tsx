import ChatHeader from "./components/ChatHeader"
import ChatMessageInput from "./components/ChatMessageInput"
import ChatMessagesList from "./components/ChatMessagesList"

function Chat() {
  const handleSend = (text:string) => {
    console.log(text)
  }

  return (
    <>
    <ChatHeader />
    <ChatMessagesList />
    <ChatMessageInput onSend={handleSend}/>
    </>
  )
}

export default Chat