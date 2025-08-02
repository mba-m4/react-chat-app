import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/store/chatStore";
import { formatTime, truncateMessage, getInitials, formatUnreadCount } from "@/utils";
import type { Talk as TalkType } from "@/types";

export default function ConversationList() {
  const { talks, selectedTalkId, setTalks, selectTalk } = useChatStore();

  // 初期データの設定
  useEffect(() => {
    const dummyTalks: TalkType[] = [
      {
        id: 1,
        name: "田中太郎",
        lastMessage: "こんにちは！今日はどうでしたか？",
        lastMessageTime: new Date("2024-01-15T14:30:00"),
        unreadCount: 2,
        participants: [],
        isGroup: false,
        createdAt: new Date("2024-01-15T10:00:00"),
        updatedAt: new Date("2024-01-15T14:30:00")
      },
      {
        id: 2,
        name: "佐藤花子",
        lastMessage: "明日の会議の資料を送ってください",
        lastMessageTime: new Date("2024-01-15T13:45:00"),
        unreadCount: undefined,
        participants: [],
        isGroup: false,
        createdAt: new Date("2024-01-15T09:00:00"),
        updatedAt: new Date("2024-01-15T13:45:00")
      },
      {
        id: 3,
        name: "開発チーム",
        lastMessage: "新しい機能の実装が完了しました。レビューをお願いします。",
        lastMessageTime: new Date("2024-01-15T12:20:00"),
        unreadCount: 5,
        participants: [],
        isGroup: true,
        createdAt: new Date("2024-01-15T08:00:00"),
        updatedAt: new Date("2024-01-15T12:20:00")
      },
      {
        id: 4,
        name: "鈴木一郎",
        lastMessage: "ありがとうございました！",
        lastMessageTime: new Date("2024-01-15T11:15:00"),
        unreadCount: undefined,
        participants: [],
        isGroup: false,
        createdAt: new Date("2024-01-15T07:00:00"),
        updatedAt: new Date("2024-01-15T11:15:00")
      },
      {
        id: 5,
        name: "山田美咲",
        lastMessage: "週末一緒に映画を見に行きませんか？",
        lastMessageTime: new Date("2024-01-15T10:30:00"),
        unreadCount: 1,
        participants: [],
        isGroup: false,
        createdAt: new Date("2024-01-15T06:00:00"),
        updatedAt: new Date("2024-01-15T10:30:00")
      },
      {
        id: 6,
        name: "営業部",
        lastMessage: "今月の売上目標を達成しました！",
        lastMessageTime: new Date("2024-01-15T09:45:00"),
        unreadCount: 3,
        participants: [],
        isGroup: true,
        createdAt: new Date("2024-01-15T05:00:00"),
        updatedAt: new Date("2024-01-15T09:45:00")
      }
    ];

    setTalks(dummyTalks);
  }, [setTalks]);

  const handleConversationClick = (talk: TalkType) => {
    selectTalk(talk.id);
  };

  return (
    <div className="h-full bg-white">
      {/* 会話一覧 */}
      <div className="h-full overflow-y-auto">
        {talks.map((talk) => (
          <Button
            key={talk.id}
            variant="ghost"
            className={`w-full h-auto p-4 border-b border-gray-100 hover:bg-gray-50 ${
              selectedTalkId === talk.id ? 'bg-blue-50 border-blue-200' : ''
            }`}
            onClick={() => handleConversationClick(talk)}
            aria-label={`${talk.name}との会話を選択`}
          >
            <div className="flex items-center w-full">
              {/* アバター */}
              <div className="relative mr-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={talk.avatar} alt={`${talk.name}のアバター`} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {getInitials(talk.name)}
                  </AvatarFallback>
                </Avatar>
                {talk.unreadCount !== undefined && talk.unreadCount !== null && talk.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {formatUnreadCount(talk.unreadCount)}
                  </div>
                )}
              </div>

              {/* 会話情報 */}
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