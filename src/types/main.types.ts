import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

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
  googleId: string | null;
  facebookId: string | null;
};

export type SettingsContent = 'app' | 'profile';

export type GoogleResponse = GoogleLoginResponse | GoogleLoginResponseOffline;

export type ChangePasswordData = {
  id: number;
  oldPassword: string;
  newPassword: string;
};

export type mode =
  | 'All modes'
  | 'Round Robin'
  | 'Last Man standing'
  | 'Elimination';

export enum TournamentType {
  elimination = 'elimination',
  lastManStanding = 'lastManStanding',
  roundRobin = 'roundRobin',
  none = 'none',
}
