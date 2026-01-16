import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  MoreHorizontal,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Users,
  Building
} from "lucide-react";
import { useChatStore } from "@/store/chatStore";
import { getInitials } from "@/utils";

export default function ConversationProfile() {
  const { selectedTalkId, talks } = useChatStore();
  
  // 選択されたチャットの情報を取得
  const selectedTalk = talks.find(talk => talk.id === selectedTalkId);
  
  // プロフィール情報がない場合のデフォルト値
  if (!selectedTalk) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center text-gray-500">
          <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">チャットを選択してください</p>
          <p className="text-sm">左側のチャット一覧から表示したいプロフィールを選択してください</p>
        </div>
      </div>
    );
  }

  // プロフィール情報を取得（グループの場合は特別な処理）
  const isGroup = selectedTalk.isGroup;
  const profile = selectedTalk.profile;
  
  if (!profile) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center text-gray-500">
          <Building className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">プロフィール情報がありません</p>
          <p className="text-sm">このチャットにはプロフィール情報が設定されていません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Background */}
      <div className="relative h-48 bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Button variant="ghost" size="sm" className="bg-white/20 hover:bg-white/30 text-white">
            ← 戻る
          </Button>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="ghost" size="sm" className="bg-white/20 hover:bg-white/30 text-white">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="bg-white/20 hover:bg-white/30 text-white">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="relative px-4 pb-6">
        {/* Avatar Section */}
        <div className="flex justify-center -mt-16 mb-4">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={profile.avatar || selectedTalk.avatar} alt={profile.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            
            {/* Online Status */}
            {profile.isOnline && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            )}
            
            {/* Verified Badge */}
            {profile.isVerified && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h1>
          <p className="text-gray-600 mb-3">@{profile.username}</p>
          
          <p className="text-gray-700 mb-4 max-w-md mx-auto leading-relaxed">
            {profile.bio}
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{profile.followers}</div>
              <div className="text-sm text-gray-600">フォロワー</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{profile.following}</div>
              <div className="text-sm text-gray-600">フォロー中</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 mb-6">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              メッセージ
            </Button>
            <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
              <Heart className="w-4 h-4 mr-2" />
              フォロー
            </Button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">プロフィール詳細</h3>
          
          <div className="space-y-3">
            {profile.location && (
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span>{profile.location}</span>
              </div>
            )}
            
            {profile.joinedDate && (
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-amber-500" />
                <span>{profile.joinedDate}から参加</span>
              </div>
            )}
            
            {profile.website && (
              <div className="flex items-center gap-3 text-gray-700">
                <LinkIcon className="w-5 h-5 text-amber-500" />
                <a href={profile.website} className="text-amber-600 hover:underline">
                  {profile.website}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">最近の活動</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-sm text-gray-700">新しいメッセージを受信しました</span>
              <span className="text-xs text-gray-500 ml-auto">2時間前</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-sm text-gray-700">プロフィールを更新しました</span>
              <span className="text-xs text-gray-500 ml-auto">1日前</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-sm text-gray-700">新しいフォロワーが追加されました</span>
              <span className="text-xs text-gray-500 ml-auto">3日前</span>
            </div>
          </div>
        </div>

        {/* Skills & Interests */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">スキル・興味</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">React</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">TypeScript</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">UI/UX</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Next.js</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Tailwind CSS</span>
          </div>
          
          <p className="text-gray-600 text-sm">
            フロントエンド開発、UI/UXデザイン、新しい技術の学習に情熱を持っています。
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">連絡先情報</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span>sample@example.com</span>
            </div>
            
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span>+81 90-1234-5678</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">その他の情報</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
              <h4 className="font-medium text-amber-800 mb-2">趣味</h4>
              <p className="text-amber-700 text-sm">プログラミング、読書、旅行、写真撮影</p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
              <h4 className="font-medium text-amber-800 mb-2">目標</h4>
              <p className="text-amber-700 text-sm">ユーザー体験を向上させるアプリケーションの開発</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
