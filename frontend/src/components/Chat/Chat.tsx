import { useEffect } from "react"
import ChatHeader from "./components/ChatHeader"
import ChatMessageInput from "./components/ChatMessageInput"
import ChatMessagesList from "./components/ChatMessagesList"
import { useChatStore } from "../../store/chatStore"

function Chat() {
  const { 
    selectedTalkId, 
    getSelectedTalk, 
    getSelectedTalkMessages, 
    addMessage 
  } = useChatStore();

  const selectedTalk = getSelectedTalk();
  const messages = getSelectedTalkMessages();

  const handleSend = (text: string) => {
    if (!selectedTalkId) return;

    const newMessage = {
      id: Date.now(),
      role: "user" as const,
      content: text
    };

    addMessage(selectedTalkId, newMessage);

    // AIの応答をシミュレート（実際の実装ではAPI呼び出し）
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: "ai" as const,
        content: `「${text}」についての応答です。`
      };
      addMessage(selectedTalkId, aiResponse);
    }, 1000);
  };

  // トークが選択されていない場合の表示
  if (!selectedTalkId || !selectedTalk) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <h2 className="text-xl font-semibold mb-2">トークを選択してください</h2>
            <p className="text-sm">左側のトーク一覧からチャットを開始したいトークを選択してください</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full'>
      <ChatHeader talkName={selectedTalk.name} />
      <div className="flex-1 min-h-0">
        <ChatMessagesList messages={messages}/>
      </div>
      <ChatMessageInput onSend={handleSend}/>
    </div>
  )
}

export default Chat