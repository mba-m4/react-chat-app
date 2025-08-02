export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen?: Date;
  bio?: string;
  phoneNumber?: string;
  location?: string;
  isCurrentUser: boolean;
}

export type UserProfile = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen?: Date;
  bio?: string;
  phoneNumber?: string;
  location?: string;
  joinDate: Date;
  totalMessages: number;
  isCurrentUser: boolean;
} 