export type SignFormData<T> = {
  [key: string]: T;
};

export type LangValue = 'hy' | 'en' | 'ru';

export type LoginData = {
  email: string;
  password: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
  expiry: number;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiry: number;
  user: User;
};

export type User = {
  id: number;
  displayName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
  verificationToken: string | null;
  googleId: string | null;
  facebookId: string | null;
};

export type SettingsContent = 'app' | 'profile';
