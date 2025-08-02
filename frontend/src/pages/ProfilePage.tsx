import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/store/chatStore";
import { getStatusColor, getStatusText, getInitials, formatDate, isValidEmail } from "@/utils";
import { USER_STATUS } from "@/constants";
import type { UserProfile, EditProfileForm } from "@/types";

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
    <div className="h-full bg-white">
      {/* プロフィール内容 */}
      <div className="overflow-y-auto h-full p-4">
        {/* アバターと基本情報 */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.avatar} alt={`${user.name}のアバター`} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute bottom-4 right-0 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(user.status)}`}></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
          <p className="text-gray-600 mb-1">{user.email}</p>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
            user.status === USER_STATUS.ONLINE ? 'bg-green-100 text-green-800' :
            user.status === USER_STATUS.AWAY ? 'bg-yellow-100 text-yellow-800' :
            user.status === USER_STATUS.BUSY ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {getStatusText(user.status)}
          </span>
        </div>

        {/* 編集モード */}
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">名前</label>
              <Input
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="名前を入力"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
              <Input
                value={editForm.email}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="メールアドレスを入力"
                type="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">自己紹介</label>
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="自己紹介を入力"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
              <Input
                value={editForm.phoneNumber}
                onChange={(e) => setEditForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                placeholder="電話番号を入力"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">場所</label>
              <Input
                value={editForm.location}
                onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                placeholder="場所を入力"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">
                保存
              </Button>
              <Button onClick={handleCancel} variant="outline" className="flex-1">
                キャンセル
              </Button>
            </div>
          </div>
        ) : (
          /* 表示モード */
          <div className="space-y-6">
            {/* ステータス選択 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">ステータス</h3>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(USER_STATUS).map(([key, value]) => (
                  <Button
                    key={value}
                    variant={user.status === value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange(value)}
                  >
                    {getStatusText(value)}
                  </Button>
                ))}
              </div>
            </div>

            {/* 基本情報 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">基本情報</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">自己紹介</span>
                  <p className="text-gray-900">{user.bio || "自己紹介がありません"}</p>
                </div>
                {user.phoneNumber && (
                  <div>
                    <span className="text-sm text-gray-500">電話番号</span>
                    <p className="text-gray-900">{user.phoneNumber}</p>
                  </div>
                )}
                {user.location && (
                  <div>
                    <span className="text-sm text-gray-500">場所</span>
                    <p className="text-gray-900">{user.location}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 統計情報 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">統計</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">参加日</span>
                  <span className="text-gray-900">{formatDate(user.joinDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">送信メッセージ数</span>
                  <span className="text-gray-900">{user.totalMessages.toLocaleString()}件</span>
                </div>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="space-y-2">
              <Button 
                onClick={() => setIsEditing(true)} 
                className="w-full"
              >
                プロフィールを編集
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => alert('設定機能は今後実装予定です')}
              >
                設定
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-red-600 hover:text-red-700"
                onClick={() => alert('ログアウト機能は今後実装予定です')}
              >
                ログアウト
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 