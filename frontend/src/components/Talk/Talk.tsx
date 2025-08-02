import { useEffect } from "react";
import type { Talk as TalkType } from "../../types/Talk";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useChatStore } from "../../store/chatStore";

export default function Talk() {
  const { talks, selectedTalkId, setTalks, selectTalk } = useChatStore();

  // 初期データの設定
  useEffect(() => {
    const dummyTalks: TalkType[] = [
      {
        id: 1,
        name: "田中太郎",
        lastMessage: "こんにちは！今日はどうでしたか？",
        lastMessageTime: new Date("2024-01-15T14:30:00"),
        unreadCount: 2
      },
      {
        id: 2,
        name: "佐藤花子",
        lastMessage: "明日の会議の資料を送ってください",
        lastMessageTime: new Date("2024-01-15T13:45:00"),
        unreadCount: undefined
      },
      {
        id: 3,
        name: "開発チーム",
        lastMessage: "新しい機能の実装が完了しました。レビューをお願いします。",
        lastMessageTime: new Date("2024-01-15T12:20:00"),
        unreadCount: 5
      },
      {
        id: 4,
        name: "鈴木一郎",
        lastMessage: "ありがとうございました！",
        lastMessageTime: new Date("2024-01-15T11:15:00"),
        unreadCount: undefined
      },
      {
        id: 5,
        name: "山田美咲",
        lastMessage: "週末一緒に映画を見に行きませんか？",
        lastMessageTime: new Date("2024-01-15T10:30:00"),
        unreadCount: 1
      },
      {
        id: 6,
        name: "営業部",
        lastMessage: "今月の売上目標を達成しました！",
        lastMessageTime: new Date("2024-01-15T09:45:00"),
        unreadCount: 3
      }
    ];

    setTalks(dummyTalks);
  }, [setTalks]);

  const handleTalkClick = (talk: TalkType) => {
    selectTalk(talk.id);
  };

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('ja-JP', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 168) { // 7日以内
      const days = ['日', '月', '火', '水', '木', '金', '土'];
      return days[date.getDay()];
    } else {
      return date.toLocaleDateString('ja-JP', { 
        month: '2-digit', 
        day: '2-digit' 
      });
    }
  };

  const truncateMessage = (message: string, maxLength: number = 30): string => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  };

  const getInitials = (name: string): string => {
    return name.substring(0, 2);
  };

  return (
    <div className="h-full bg-white">
      {/* トーク一覧 */}
      <div className="h-full overflow-y-auto">
        {talks.map((talk) => (
          <Button
            key={talk.id}
            variant="ghost"
            className={`w-full h-auto p-4 border-b border-gray-100 hover:bg-gray-50 ${
              selectedTalkId === talk.id ? 'bg-blue-50 border-blue-200' : ''
            }`}
            onClick={() => handleTalkClick(talk)}
          >
            <div className="flex items-center w-full">
              {/* アバター */}
              <div className="relative mr-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={talk.avatar} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {getInitials(talk.name)}
                  </AvatarFallback>
                </Avatar>
                {talk.unreadCount !== undefined && talk.unreadCount !== null && talk.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {talk.unreadCount > 99 ? "99+" : talk.unreadCount}
                  </div>
                )}
              </div>

              {/* トーク情報 */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {talk.name}
                  </h3>
                  <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                    {formatTime(talk.lastMessageTime)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {truncateMessage(talk.lastMessage)}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
