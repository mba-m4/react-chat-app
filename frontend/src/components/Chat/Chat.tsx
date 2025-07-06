import ChatHeader from "./components/ChatHeader"
import ChatMessageInput from "./components/ChatMessageInput"
import ChatMessagesList from "./components/ChatMessagesList"

function Chat() {
  const handleSend = (text:string) => {
    console.log(text)
  }

  return (
    <>
    <div className='flex flex-col h-[100vh]'>
    <ChatHeader />
    <ChatMessagesList />
    <ChatMessageInput onSend={handleSend}/>
    </div>
    </>
  )
}

export default Chat