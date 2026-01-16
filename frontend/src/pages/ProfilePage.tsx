import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/store/chatStore";
import { getStatusColor, getStatusText, getInitials, formatDate, isValidEmail } from "@/utils";
import { USER_STATUS } from "@/constants";
import type { UserProfile, EditProfileForm } from "@/types";
import { 
  Edit3, 
  Save, 
  X, 
  Settings, 
  LogOut, 
  Calendar,
  MessageSquare,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

export default function ProfilePage() {
  const { currentUser, updateCurrentUser, updateUserStatus } = useChatStore();
  const [isEditing, setIsEditing] = useState(false);

  // デフォルトユーザー（実際の実装ではAPIから取得）
  const defaultUser: UserProfile = {
    id: 1,
    name: "田中太郎",
    email: "tanaka@example.com",
    status: USER_STATUS.ONLINE,
    bio: "フロントエンド開発者です。ReactとTypeScriptが好きです。",
    phoneNumber: "090-1234-5678",
    location: "東京",
    joinDate: new Date("2023-01-15"),
    totalMessages: 1250,
    isCurrentUser: true,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date()
  };

  const user = currentUser || defaultUser;

  const [editForm, setEditForm] = useState<EditProfileForm>({
    name: user.name,
    email: user.email,
    bio: user.bio || "",
    phoneNumber: user.phoneNumber || "",
    location: user.location || ""
  });

  const handleSave = () => {
    if (!isValidEmail(editForm.email)) {
      alert("有効なメールアドレスを入力してください");
      return;
    }

    updateCurrentUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      email: user.email,
      bio: user.bio || "",
      phoneNumber: user.phoneNumber || "",
      location: user.location || ""
    });
    setIsEditing(false);
  };

  const handleStatusChange = (status: typeof USER_STATUS[keyof typeof USER_STATUS]) => {
    updateUserStatus(status);
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100">
      {/* プロフィール内容 */}
      <div className="overflow-y-auto h-full p-4">
        {/* ヘッダー背景 */}
        <div className="relative h-32 bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 rounded-2xl mb-6">
          <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
        </div>

        {/* アバターと基本情報 */}
        <div className="text-center mb-6 relative">
          <div className="relative inline-block -mt-16">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar} alt={`${user.name}のアバター`} />
              <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-3xl font-bold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white ${getStatusColor(user.status)}`}></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail className="w-4 h-4 text-amber-500" />
            <p className="text-gray-600">{user.email}</p>
          </div>
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
            user.status === USER_STATUS.ONLINE ? 'bg-green-100 text-green-800 border border-green-200' :
            user.status === USER_STATUS.AWAY ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
            user.status === USER_STATUS.BUSY ? 'bg-red-100 text-red-800 border border-red-200' :
            'bg-gray-100 text-gray-800 border border-gray-200'
          }`}>
            {getStatusText(user.status)}
          </span>
        </div>

        {/* 編集モード */}
        {isEditing ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-amber-500" />
              プロフィール編集
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">名前</label>
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="名前を入力"
                  required
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
                <Input
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="メールアドレスを入力"
                  type="email"
                  required
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">自己紹介</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="自己紹介を入力"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
                <Input
                  value={editForm.phoneNumber}
                  onChange={(e) => setEditForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  placeholder="電話番号を入力"
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">場所</label>
                <Input
                  value={editForm.location}
                  onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="場所を入力"
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  <Save className="w-4 h-4 mr-2" />
                  保存
                </Button>
                <Button onClick={handleCancel} variant="outline" className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50">
                  <X className="w-4 h-4 mr-2" />
                  キャンセル
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* 表示モード */
          <div className="space-y-6">
            {/* ステータス選択 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ステータス</h3>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(USER_STATUS).map(([key, value]) => (
                  <Button
                    key={value}
                    variant={user.status === value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange(value)}
                    className={user.status === value ? 
                      'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' : 
                      'border-amber-300 text-amber-700 hover:bg-amber-50'
                    }
                  >
                    {getStatusText(value)}
                  </Button>
                ))}
              </div>
            </div>

            {/* 基本情報 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h3>
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <span className="text-sm text-amber-700 font-medium block mb-2">自己紹介</span>
                  <p className="text-amber-800">{user.bio || "自己紹介がありません"}</p>
                </div>
                {user.phoneNumber && (
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <Phone className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="text-sm text-amber-700 font-medium block">電話番号</span>
                      <p className="text-amber-800">{user.phoneNumber}</p>
                    </div>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <MapPin className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="text-sm text-amber-700 font-medium block">場所</span>
                      <p className="text-amber-800">{user.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 統計情報 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">統計</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  <div className="flex-1">
                    <span className="text-sm text-amber-700 font-medium block">参加日</span>
                    <p className="text-amber-800">{formatDate(user.joinDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <MessageSquare className="w-5 h-5 text-amber-500" />
                  <div className="flex-1">
                    <span className="text-sm text-amber-700 font-medium block">送信メッセージ数</span>
                    <p className="text-amber-800">{user.totalMessages.toLocaleString()}件</p>
                  </div>
                </div>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="space-y-3">
              <Button 
                onClick={() => setIsEditing(true)} 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                プロフィールを編集
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                onClick={() => alert('設定機能は今後実装予定です')}
              >
                <Settings className="w-4 h-4 mr-2" />
                設定
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => alert('ログアウト機能は今後実装予定です')}
              >
                <LogOut className="w-4 h-4 mr-2" />
                ログアウト
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 