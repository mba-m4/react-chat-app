import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/store/chatStore";
import { formatTime, truncateMessage, getInitials, formatUnreadCount } from "@/utils";
import type { Talk as TalkType } from "@/types";

export default function ConversationList() {
  const { talks, selectedTalkId, setTalks, selectTalk, setInitialMessages } = useChatStore();

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
        updatedAt: new Date("2024-01-15T14:30:00"),
        profile: {
          name: "田中太郎",
          username: "tanaka_taro",
          bio: "フロントエンド開発者として日々新しい技術を学んでいます。React、TypeScript、UI/UXデザインが大好きです。",
          avatar: "/api/placeholder/150/150",
          location: "Tokyo, Japan",
          joinedDate: "2023年1月",
          website: "https://tanaka-dev.com",
          followers: 1234,
          following: 567,
          isOnline: true,
          isVerified: true,
          skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "UI/UX"],
          interests: ["プログラミング", "読書", "旅行", "写真撮影"],
          contactEmail: "tanaka@example.com",
          contactPhone: "+81 90-1234-5678"
        }
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
        updatedAt: new Date("2024-01-15T13:45:00"),
        profile: {
          name: "佐藤花子",
          username: "sato_hanako",
          bio: "プロジェクトマネージャーとして、チームの成功をサポートしています。コミュニケーションとリーダーシップが得意です。",
          avatar: "/api/placeholder/150/150",
          location: "Osaka, Japan",
          joinedDate: "2022年6月",
          website: "https://sato-pm.com",
          followers: 856,
          following: 234,
          isOnline: false,
          isVerified: false,
          skills: ["プロジェクト管理", "アジャイル", "コミュニケーション", "リーダーシップ"],
          interests: ["マネジメント", "心理学", "カフェ巡り", "ヨガ"],
          contactEmail: "sato@example.com",
          contactPhone: "+81 90-2345-6789"
        }
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
        updatedAt: new Date("2024-01-15T12:20:00"),
        profile: {
          name: "開発チーム",
          username: "dev_team",
          bio: "フルスタック開発チームです。フロントエンドからバックエンドまで、最新技術を駆使して高品質なアプリケーションを開発しています。",
          avatar: "/api/placeholder/150/150",
          location: "Tokyo, Japan",
          joinedDate: "2021年4月",
          website: "https://dev-team.com",
          followers: 2156,
          following: 89,
          isOnline: true,
          isVerified: true,
          skills: ["React", "Node.js", "Python", "AWS", "Docker", "Kubernetes"],
          interests: ["技術革新", "オープンソース", "ハッカソン", "技術勉強会"],
          contactEmail: "dev-team@example.com",
          contactPhone: "+81 3-1234-5678"
        }
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
        updatedAt: new Date("2024-01-15T11:15:00"),
        profile: {
          name: "鈴木一郎",
          username: "suzuki_ichiro",
          bio: "デザイナーとして、ユーザー体験を向上させる美しいインターフェースを作成しています。",
          avatar: "/api/placeholder/150/150",
          location: "Kyoto, Japan",
          joinedDate: "2022年9月",
          website: "https://suzuki-design.com",
          followers: 1890,
          following: 445,
          isOnline: true,
          isVerified: false,
          skills: ["Figma", "Adobe Creative Suite", "UI/UX", "プロトタイピング", "デザインシステム"],
          interests: ["アート", "デザイン", "写真", "旅行"],
          contactEmail: "suzuki@example.com",
          contactPhone: "+81 90-3456-7890"
        }
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
        updatedAt: new Date("2024-01-15T10:30:00"),
        profile: {
          name: "山田美咲",
          username: "yamada_misaki",
          bio: "マーケティングスペシャリストとして、ブランドの成長をサポートしています。データ分析とクリエイティブな戦略が得意です。",
          avatar: "/api/placeholder/150/150",
          location: "Fukuoka, Japan",
          joinedDate: "2023年3月",
          website: "https://yamada-marketing.com",
          followers: 2341,
          following: 678,
          isOnline: false,
          isVerified: true,
          skills: ["デジタルマーケティング", "SNS運用", "データ分析", "コンテンツ作成", "SEO"],
          interests: ["マーケティング", "SNS", "映画", "カフェ", "旅行"],
          contactEmail: "yamada@example.com",
          contactPhone: "+81 90-4567-8901"
        }
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
        updatedAt: new Date("2024-01-15T09:45:00"),
        profile: {
          name: "営業部",
          username: "sales_team",
          bio: "営業チームとして、お客様との信頼関係を築き、ビジネスの成長に貢献しています。",
          avatar: "/api/placeholder/150/150",
          location: "Tokyo, Japan",
          joinedDate: "2020年7月",
          website: "https://sales-team.com",
          followers: 1567,
          following: 123,
          isOnline: true,
          isVerified: false,
          skills: ["営業", "顧客管理", "プレゼンテーション", "ネゴシエーション", "CRM"],
          interests: ["営業", "ビジネス", "人脈作り", "ゴルフ", "読書"],
          contactEmail: "sales@example.com",
          contactPhone: "+81 3-2345-6789"
        }
      }
    ];

    setTalks(dummyTalks);

    // 初期メッセージを設定
    const initialMessages = {
      1: [ // 田中太郎との会話
        {
          content: "こんにちは！今日はどうでしたか？",
          role: "ai" as const,
          talkId: 1,
          senderId: 0,
          isRead: true
        },
        {
          content: "こんにちは！今日はとても良い一日でした。新しいプロジェクトの企画を進めていて、とても充実しています。",
          role: "user" as const,
          talkId: 1,
          senderId: 1,
          isRead: true
        },
        {
          content: "それは素晴らしいですね！どんなプロジェクトなのか興味があります。",
          role: "ai" as const,
          talkId: 1,
          senderId: 0,
          isRead: true
        }
      ],
      2: [ // 佐藤花子との会話
        {
          content: "明日の会議の資料を送ってください",
          role: "ai" as const,
          talkId: 2,
          senderId: 0,
          isRead: true
        },
        {
          content: "承知いたしました。明日の会議資料を準備して、今日中にお送りいたします。",
          role: "user" as const,
          talkId: 2,
          senderId: 1,
          isRead: true
        }
      ],
      3: [ // 開発チームとの会話
        {
          content: "新しい機能の実装が完了しました。レビューをお願いします。",
          role: "ai" as const,
          talkId: 3,
          senderId: 0,
          isRead: true
        },
        {
          content: "素晴らしい！コードレビューを開始します。テストも実行して、問題がないか確認してください。",
          role: "user" as const,
          talkId: 3,
          senderId: 1,
          isRead: true
        },
        {
          content: "承知いたしました。テストを実行して、結果をお知らせします。",
          role: "ai" as const,
          talkId: 3,
          senderId: 0,
          isRead: true
        }
      ],
      4: [ // 鈴木一郎との会話
        {
          content: "ありがとうございました！",
          role: "user" as const,
          talkId: 4,
          senderId: 1,
          isRead: true
        },
        {
          content: "どういたしまして！何か他にご質問がございましたら、お気軽にお声かけください。",
          role: "ai" as const,
          talkId: 4,
          senderId: 0,
          isRead: true
        }
      ],
      5: [ // 山田美咲との会話
        {
          content: "週末一緒に映画を見に行きませんか？",
          role: "ai" as const,
          talkId: 5,
          senderId: 0,
          isRead: true
        },
        {
          content: "素敵な提案ですね！どの映画を見たいですか？",
          role: "user" as const,
          talkId: 5,
          senderId: 1,
          isRead: true
        }
      ],
      6: [ // 営業部との会話
        {
          content: "今月の売上目標を達成しました！",
          role: "ai" as const,
          talkId: 6,
          senderId: 0,
          isRead: true
        },
        {
          content: "おめでとうございます！素晴らしい成果ですね。",
          role: "user" as const,
          talkId: 6,
          senderId: 1,
          isRead: true
        },
        {
          content: "ありがとうございます！チーム一丸となって取り組んだ結果です。",
          role: "ai" as const,
          talkId: 6,
          senderId: 0,
          isRead: true
        }
      ]
    };

    // 各チャットに初期メッセージを設定
    Object.entries(initialMessages).forEach(([talkId, messages]) => {
      setInitialMessages(parseInt(talkId), messages);
    });

    // デバッグ用：初期メッセージ設定後の状態を確認
    console.log('Initial messages set for all talks');
  }, [setTalks, setInitialMessages]);

  const handleConversationClick = (talk: TalkType) => {
    selectTalk(talk.id);
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100">
      {/* ヘッダー */}
      <div className="p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-gray-900">チャット一覧</h2>
        <p className="text-sm text-gray-600 mt-1">最近の会話</p>
      </div>
      
      {/* 会話一覧 */}
      <div className="h-full overflow-y-auto p-2">
        {talks.map((talk) => (
          <Button
            key={talk.id}
            variant="ghost"
            className={`w-full h-auto p-4 mb-2 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-200 ${
              selectedTalkId === talk.id ? 'bg-white shadow-lg border-amber-200 ring-2 ring-amber-100' : 'bg-white/60 hover:bg-white'
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