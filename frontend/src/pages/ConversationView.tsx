import { useEffect } from "react";
import { 
  ConversationHeader, 
  ConversationMessageInput, 
  ConversationMessagesList 
} from "@/features/conversation";
import { useChatStore } from "@/store/chatStore";
import { MESSAGE_ROLE } from "@/constants";
import type { MessageRole } from "@/constants";
import { MessageCircle } from "lucide-react";

/**
 * チャット画面コンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - 選択されたチャットの表示
 * - メッセージの送信機能
 * - AIの応答シミュレーション
 * - エラー処理とクリーンアップ
 * 
 * レイアウト：
 * - ヘッダー：チャット名とアイコン
 * - メッセージ一覧：過去のメッセージを表示
 * - メッセージ入力：新しいメッセージの送信
 * 
 * 状態管理：
 * - selectedTalkId: 選択されたチャットID
 * - selectedTalk: 選択されたチャットの詳細情報
 * - messages: チャットのメッセージ一覧
 */

export default function ConversationView() {
  // チャットストアから必要な状態とアクションを取得
  const { 
    selectedTalkId, 
    getSelectedTalk, 
    getSelectedTalkMessages, 
    addMessage,
    error,
    clearError
  } = useChatStore();

  // 現在選択されているチャットとメッセージを取得
  const selectedTalk = getSelectedTalk();
  const messages = getSelectedTalkMessages();

  /**
   * メッセージ送信ハンドラー
   * @param text 送信するメッセージの内容
   */
  const handleSend = (text: string) => {
    if (!selectedTalkId) return;

    // ユーザーメッセージを作成
    const newMessage = {
      content: text,
      role: MESSAGE_ROLE.USER as MessageRole,
      talkId: selectedTalkId,
      senderId: 1, // 仮のユーザーID
      isRead: false
    };

    // メッセージをチャットストアに追加
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
      <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-amber-500" />
            </div>
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