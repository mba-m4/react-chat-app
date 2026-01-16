# React Chat App 機能詳細仕様書

## 概要

このドキュメントでは、React Chat Appの各機能について、実装の詳細、動作フロー、使用方法を詳しく説明します。初学者がコードを理解し、機能を拡張できるように設計されています。

## 1. チャット機能

### 1.1 チャット一覧表示

#### 機能概要
チャット一覧では、ユーザーが参加しているチャット（個別チャット・グループチャット）を一覧表示し、選択できる機能を提供します。

#### 実装詳細

##### データ構造
```typescript
interface Talk {
  id: number;              // チャットの一意識別子
  name: string;            // チャット名（ユーザー名またはグループ名）
  avatar?: string;         // アバター画像URL
  lastMessage: string;     // 最新メッセージの内容
  lastMessageTime: Date;   // 最新メッセージの送信時刻
  unreadCount?: number;    // 未読メッセージ数
  participants: User[];    // 参加者一覧
  isGroup: boolean;        // グループチャットかどうか
  profile?: ProfileData;   // プロフィール情報
}
```

##### 表示ロジック
1. **初期化処理**
   ```typescript
   useEffect(() => {
     // ダミーデータを設定
     setTalks(dummyTalks);
     
     // 各チャットに初期メッセージを設定
     Object.entries(initialMessages).forEach(([talkId, messages]) => {
       setInitialMessages(parseInt(talkId), messages);
     });
   }, [setTalks, setInitialMessages]);
   ```

2. **チャット選択処理**
   ```typescript
   const handleConversationClick = (talk: TalkType) => {
     selectTalk(talk.id);  // チャットストアで選択状態を更新
   };
   ```

3. **選択状態の表示**
   ```typescript
   className={`w-full h-auto p-4 mb-2 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-200 ${
     selectedTalkId === talk.id 
       ? 'bg-white shadow-lg border-amber-200 ring-2 ring-amber-100' 
       : 'bg-white/60 hover:bg-white'
   }`}
   ```

#### 使用方法
1. 左パネルのチャット一覧から表示したいチャットをクリック
2. 選択されたチャットは視覚的にハイライト表示
3. 中央パネルにチャット画面が表示される

#### カスタマイズポイント
- `dummyTalks`配列を編集してチャットデータを変更
- `initialMessages`オブジェクトで初期メッセージを設定
- CSSクラスを変更して表示スタイルを調整

### 1.2 チャット画面

#### 機能概要
チャット画面では、選択されたチャットのメッセージ履歴を表示し、新しいメッセージを送信できる機能を提供します。

#### 実装詳細

##### メッセージ送信フロー
```typescript
const handleSend = (text: string) => {
  if (!selectedTalkId) return;

  // 1. ユーザーメッセージを作成
  const newMessage = {
    content: text,
    role: MESSAGE_ROLE.USER,
    talkId: selectedTalkId,
    senderId: 1,
    isRead: false
  };

  // 2. チャットストアにメッセージを追加
  addMessage(selectedTalkId, newMessage);

  // 3. AI応答をシミュレート（1秒後）
  setTimeout(() => {
    const aiResponse = {
      content: `「${text}」についての応答です。`,
      role: MESSAGE_ROLE.AI,
      talkId: selectedTalkId,
      senderId: 0,
      isRead: true
    };
    addMessage(selectedTalkId, aiResponse);
  }, 1000);
};
```

##### メッセージ表示ロジック
1. **メッセージの並び替え**
   ```typescript
   messages
     .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
     .map((message) => (
       // メッセージ表示コンポーネント
     ))
   ```

2. **ユーザー/AIメッセージの区別**
   ```typescript
   const isUserMessage = (role: MessageRole) => role === MESSAGE_ROLE.USER;
   const isAIMessage = (role: MessageRole) => role === MESSAGE_ROLE.AI;
   ```

3. **レイアウト調整**
   ```typescript
   className={`flex gap-3 ${isUserMessage(message.role) ? "flex-row-reverse" : ""}`}
   ```

#### 使用方法
1. 中央パネルのメッセージ入力欄にテキストを入力
2. Enterキーまたは送信ボタンをクリック
3. メッセージが送信され、AIの応答が1秒後に表示される

#### カスタマイズポイント
- `handleSend`関数でメッセージ送信処理をカスタマイズ
- AI応答のシミュレーションロジックを変更
- メッセージの表示スタイルを調整

### 1.3 メッセージ表示

#### 機能概要
メッセージ表示では、チャットのメッセージを適切なレイアウトで表示し、ユーザーとAIのメッセージを区別します。

#### 実装詳細

##### メッセージバブルの幅設定
```typescript
${isUserMessage(message.role)
  ? 'max-w-[clamp(50%,60ch,85%)]'  // ユーザーメッセージ（右寄せ）
  : 'max-w-[clamp(40%,55ch,80%)]'   // AIメッセージ（左寄せ）
}
```

##### メッセージの折り返し設定
```typescript
<p className="text-sm break-words leading-relaxed whitespace-normal">
  {message.content}
</p>
```

- `break-words`: 長い単語を適切に折り返し
- `leading-relaxed`: 読みやすい行間
- `whitespace-normal`: 通常の空白文字処理

##### アバター表示
```typescript
<Avatar className="h-10 w-10">
  <AvatarImage 
    src={isUserMessage(message.role) ? "https://github.com/shadcn.png" : undefined} 
    alt={isUserMessage(message.role) ? "ユーザーアバター" : "AIアバター"}
  />
  <AvatarFallback className={isUserMessage(message.role) 
    ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white font-semibold" 
    : "bg-gradient-to-br from-slate-400 to-gray-500 text-white font-semibold"
  }>
    {isUserMessage(message.role) ? "U" : "AI"}
  </AvatarFallback>
</Avatar>
```

#### 使用方法
- メッセージは自動的に時系列順に並び替えられる
- ユーザーメッセージは右側、AIメッセージは左側に表示
- 長いメッセージは適切に折り返される

#### カスタマイズポイント
- `max-w-[clamp()]`の値を調整してメッセージバブルの幅を変更
- アバターのスタイルやフォールバック表示をカスタマイズ
- メッセージの表示スタイル（色、フォント等）を調整

## 2. プロフィール機能

### 2.1 プロフィール表示

#### 機能概要
プロフィール表示では、選択されたチャットの詳細なプロフィール情報を表示します。

#### 実装詳細

##### プロフィールデータの取得
```typescript
const { selectedTalkId, talks } = useChatStore();

// 選択されたチャットの情報を取得
const selectedTalk = talks.find(talk => talk.id === selectedTalkId);

// プロフィール情報を取得
const profile = selectedTalk?.profile;
```

##### 条件付きレンダリング
```typescript
// チャットが選択されていない場合
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

// プロフィール情報がない場合
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
```

##### プロフィール情報の表示
1. **ヘッダー背景**: グラデーション背景とアバター
2. **基本情報**: 名前、ユーザー名、自己紹介
3. **統計情報**: フォロワー数、フォロー数
4. **詳細情報**: 場所、参加日、ウェブサイト
5. **スキル・興味**: タグ形式での表示
6. **連絡先情報**: メール、電話番号
7. **その他の情報**: 趣味、目標等

#### 使用方法
1. 左側のチャット一覧からプロフィールを表示したいチャットを選択
2. 右側のプロフィールパネルに詳細情報が表示される
3. スクロールしてすべての情報を閲覧

#### カスタマイズポイント
- `mockProfileData`オブジェクトを編集してプロフィール情報を変更
- 表示するセクションを追加・削除・変更
- CSSクラスを調整して表示スタイルを変更

### 2.2 プロフィール編集

#### 機能概要
プロフィール編集では、ユーザーのプロフィール情報を表示・編集できる機能を提供します。

#### 実装詳細

##### 状態管理
```typescript
const [isEditing, setIsEditing] = useState(false);
const [editForm, setEditForm] = useState<EditProfileForm>({
  name: user.name,
  email: user.email,
  bio: user.bio || "",
  phoneNumber: user.phoneNumber || "",
  location: user.location || ""
});
```

##### 編集モードの切り替え
```typescript
// 編集開始
<Button onClick={() => setIsEditing(true)} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
  <Edit3 className="w-4 h-4 mr-2" />
  プロフィールを編集
</Button>

// 編集モードの表示
{isEditing ? (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
    {/* 編集フォーム */}
  </div>
) : (
  /* 表示モード */
)}
```

##### フォーム処理
```typescript
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
```

#### 使用方法
1. 「プロフィールを編集」ボタンをクリック
2. 各フィールドを編集
3. 「保存」ボタンで変更を保存、「キャンセル」で変更を破棄

#### カスタマイズポイント
- `EditProfileForm`インターフェースを拡張してフィールドを追加
- バリデーションロジックをカスタマイズ
- フォームのレイアウトやスタイルを調整

## 3. 状態管理

### 3.1 Zustandストア

#### 機能概要
Zustandを使用してアプリケーション全体の状態を管理します。

#### 実装詳細

##### ストアの構造
```typescript
interface ChatState {
  // 状態
  talks: Talk[];                    // チャット一覧
  selectedTalkId: number | null;    // 選択中のチャットID
  messages: Record<number, Message[]>; // チャットID別メッセージ
  currentUser: UserProfile | null;  // 現在のユーザー
  isLoading: boolean;               // ローディング状態
  error: string | null;             // エラー状態

  // アクション
  setTalks: (talks: Talk[]) => void;
  selectTalk: (talkId: number) => void;
  addMessage: (talkId: number, message: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>) => void;
  // ... その他のアクション
}
```

##### アクションの実装
```typescript
// メッセージ追加
addMessage: (talkId, messageData) => {
  const { messages, talks, selectedTalkId } = get();
  const currentMessages = messages[talkId] || [];
  
  const newMessage: Message = {
    ...messageData,
    id: Date.now(),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const updatedMessages = { 
    ...messages, 
    [talkId]: [...currentMessages, newMessage] 
  };

  // トークの最後のメッセージを更新
  const updatedTalks = talks.map(talk => {
    if (talk.id === talkId) {
      return {
        ...talk,
        lastMessage: newMessage.content,
        lastMessageTime: new Date(),
        unreadCount: selectedTalkId === talkId ? undefined : (talk.unreadCount || 0) + 1,
        updatedAt: new Date()
      };
    }
    return talk;
  });

  set({ 
    messages: updatedMessages,
    talks: updatedTalks,
    error: null
  });
}
```

#### 使用方法
```typescript
// コンポーネントでストアを使用
const { talks, selectedTalkId, addMessage } = useChatStore();

// 状態の取得
const selectedTalk = talks.find(talk => talk.id === selectedTalkId);

// アクションの実行
addMessage(talkId, messageData);
```

#### カスタマイズポイント
- 新しい状態やアクションを追加
- 既存のアクションのロジックを変更
- エラーハンドリングを強化

## 4. デザインシステム

### 4.1 カラーパレット

#### プライマリカラー
- **アンバー系**: `from-amber-400 to-orange-500`
- **グラデーション**: `bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500`

#### セカンダリカラー
- **スレート系**: `from-slate-50 to-slate-100`
- **グレー系**: `bg-gray-50`, `text-gray-600`

#### アクセントカラー
- **成功**: `bg-green-100 text-green-800`
- **警告**: `bg-yellow-100 text-yellow-800`
- **エラー**: `bg-red-100 text-red-800`

### 4.2 コンポーネントデザイン

#### カードデザイン
```typescript
className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
```

#### ボタンデザイン
```typescript
// プライマリボタン
className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"

// アウトラインボタン
className="border-amber-300 text-amber-700 hover:bg-amber-50"
```

#### レイアウト原則
- **スペーシング**: `gap-4`, `p-6`, `mb-6`
- **角丸**: `rounded-2xl`, `rounded-lg`
- **影**: `shadow-sm`, `shadow-lg`

## 5. エラーハンドリング

### 5.1 エラー表示

#### エラーメッセージの表示
```typescript
if (error) {
  return (
    <div className="text-center text-red-600">
      <p>エラーが発生しました: {error}</p>
    </div>
  );
}
```

#### ローディング状態の表示
```typescript
if (isLoading) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
    </div>
  );
}
```

### 5.2 バリデーション

#### メールアドレスの検証
```typescript
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

#### フォームバリデーション
```typescript
const handleSave = () => {
  if (!editForm.name.trim()) {
    alert("名前を入力してください");
    return;
  }

  if (!isValidEmail(editForm.email)) {
    alert("有効なメールアドレスを入力してください");
    return;
  }

  // 保存処理
};
```

## 6. パフォーマンス最適化

### 6.1 メモ化

#### React.memoの使用
```typescript
const ConversationHeader = React.memo(({ conversationName }: ConversationHeaderProps) => {
  // コンポーネントの実装
});
```

#### コールバック関数のメモ化
```typescript
const handleSend = useCallback((text: string) => {
  // メッセージ送信処理
}, [selectedTalkId, addMessage]);
```

### 6.2 状態管理の最適化

#### 必要な状態のみを購読
```typescript
// 必要な状態のみを取得
const { talks, selectedTalkId } = useChatStore(state => ({
  talks: state.talks,
  selectedTalkId: state.selectedTalkId
}));
```

#### 状態の分割
```typescript
// 大きなストアを小さなストアに分割
const useChatStore = create<ChatState>()(/* ... */);
const useUserStore = create<UserState>()(/* ... */);
```

## 7. テスト

### 7.1 ユニットテスト

#### コンポーネントのテスト
```typescript
import { render, screen } from '@testing-library/react';
import ConversationList from './ConversationList';

test('チャット一覧が正しく表示される', () => {
  render(<ConversationList />);
  expect(screen.getByText('チャット一覧')).toBeInTheDocument();
});
```

#### ユーティリティ関数のテスト
```typescript
import { isValidEmail } from './utils';

test('有効なメールアドレスを正しく判定する', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
  expect(isValidEmail('invalid-email')).toBe(false);
});
```

### 7.2 統合テスト

#### ユーザーフローのテスト
```typescript
test('チャット選択からメッセージ送信までの流れ', async () => {
  // 1. チャット一覧を表示
  // 2. チャットを選択
  // 3. メッセージを送信
  // 4. AI応答が表示されることを確認
});
```

## まとめ

このドキュメントでは、React Chat Appの各機能について詳細に説明しました。各機能の実装方法、使用方法、カスタマイズポイントを理解することで、アプリケーションの拡張や改善が可能になります。

特に重要なポイント：
1. **コンポーネントの責任分離**: 各コンポーネントが明確な役割を持つ
2. **状態管理の一元化**: Zustandによる効率的な状態管理
3. **一貫したデザインシステム**: Tailwind CSSによる統一されたスタイリング
4. **型安全性**: TypeScriptによる堅牢なコード

これらの知識を活用して、さらなる機能追加や改善を進めてください。
