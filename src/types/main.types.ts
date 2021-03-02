import { RefObject } from 'react';
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

export type SettingsContent = 'app' | 'profile' | 'players';

export enum activeSideBarIcon {
  settings = 'settings',
  players = 'players',
  none = 'none',
}

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

export enum setPlayersSettingsView {
  cards = 'cards',
  single = 'single',
  team = 'team',
  DRP = 'draw your partner',
}
export type Player = {
  name: string;
  ref: RefObject<HTMLDivElement>;
  focus: boolean;
  edit: boolean;
  id: number;
  draft?: string;
};

export type SetupPlayer = {
  name: string;
  id: number;
};

export type SetupGame = {
  player1?: SetupPlayer;
  player2?: SetupPlayer;
  next?: number | null;
  id: number;
};

export type SetupState = {
  players: SetupPlayer[];
  games: SetupGame[];
  rounds: SetupRound[];
};

export type SetupRound = {
  name: string;
  games: SetupGame[];
};

export type PlayerResponse = {
  id: number;
  name: string;
  tournamentId: number | undefined;
  userId: number;
};

export type GroupResponse = {
  id: number;
  name: string;
  userId: number;
  players: PlayerResponse[];
};
