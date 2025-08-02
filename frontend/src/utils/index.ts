import { USER_STATUS, MESSAGE_ROLE, TIME_FORMAT, DEFAULTS, APP_CONFIG } from '@/constants';
import type { UserStatus, MessageRole } from '@/constants';

// 時間フォーマット関連
export const formatTime = (date: Date): string => {
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

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 文字列処理
export const truncateMessage = (message: string, maxLength: number = 30): string => {
  if (message.length <= maxLength) return message;
  return message.substring(0, maxLength) + "...";
};

export const getInitials = (name: string): string => {
  return name.substring(0, 2);
};

// ステータス関連
export const getStatusColor = (status: UserStatus): string => {
  switch (status) {
    case USER_STATUS.ONLINE: return 'bg-green-500';
    case USER_STATUS.AWAY: return 'bg-yellow-500';
    case USER_STATUS.BUSY: return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export const getStatusText = (status: UserStatus): string => {
  switch (status) {
    case USER_STATUS.ONLINE: return 'オンライン';
    case USER_STATUS.AWAY: return '離席中';
    case USER_STATUS.BUSY: return '忙しい';
    default: return 'オフライン';
  }
};

// バリデーション
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidMessage = (message: string): boolean => {
  return message.trim().length > 0 && message.length <= 1000; // 固定値を使用
};

// 未読数フォーマット
export const formatUnreadCount = (count: number): string => {
  return count > APP_CONFIG.maxUnreadCount ? `${APP_CONFIG.maxUnreadCount}+` : count.toString();
};

// メッセージロール判定
export const isUserMessage = (role: MessageRole): boolean => {
  return role === MESSAGE_ROLE.USER;
};

export const isAIMessage = (role: MessageRole): boolean => {
  return role === MESSAGE_ROLE.AI;
};

// エラーハンドリング
export const createError = (message: string, code?: string): Error => {
  const error = new Error(message);
  if (code) {
    (error as any).code = code;
  }
  return error;
};

// デバウンス関数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}; 