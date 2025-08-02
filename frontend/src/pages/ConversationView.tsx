import { useEffect } from "react";
import { 
  ConversationHeader, 
  ConversationMessageInput, 
  ConversationMessagesList 
} from "@/features/conversation";
import { useChatStore } from "@/store/chatStore";
import { MESSAGE_ROLE } from "@/constants";
import type { MessageRole } from "@/constants";

export default function ConversationView() {
  const { 
    selectedTalkId, 
    getSelectedTalk, 
    getSelectedTalkMessages, 
    addMessage,
    error,
    clearError
  } = useChatStore();

  const selectedTalk = getSelectedTalk();
  const messages = getSelectedTalkMessages();

  const handleSend = (text: string) => {
    if (!selectedTalkId) return;

    const newMessage = {
      content: text,
      role: MESSAGE_ROLE.USER as MessageRole,
      talkId: selectedTalkId,
      senderId: 1, // 仮のユーザーID
      isRead: false
    };

    addMessage(selectedTalkId, newMessage);

    // AIの応答をシミュレート（実際の実装ではAPI呼び出し）
    setTimeout(() => {
      const aiResponse = {
        content: `「${text}」についての応答です。`,
        role: MESSAGE_ROLE.AI as MessageRole,
        talkId: selectedTalkId,
        senderId: 0, // AIのID
        isRead: true
      };
      addMessage(selectedTalkId, aiResponse);
    }, 1000);
  };

  // エラーが発生した場合のクリーンアップ
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // 会話が選択されていない場合の表示
  if (!selectedTalkId || !selectedTalk) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <h2 className="text-xl font-semibold mb-2">会話を選択してください</h2>
            <p className="text-sm">左側の会話一覧からチャットを開始したい会話を選択してください</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full'>
      <ConversationHeader conversationName={selectedTalk.name} />
      <div className="flex-1 min-h-0">
        <ConversationMessagesList messages={messages}/>
      </div>
      <ConversationMessageInput onSend={handleSend}/>
    </div>
  );
} 