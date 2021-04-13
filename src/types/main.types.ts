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
  elimination = 1,
  lastManStanding = 2,
  roundRobin = 3,
  none = 'none',
}

export type Player = {
  id: number;
  name: string;
  userId: number;
  totalGames: number | null;
  totalWins: number | null;
  totalPoints: number | null;
  gameId: number | null;
  ref: RefObject<HTMLDivElement>;
  focus: boolean;
};

export type PlayerWithNameAndId = {
  name: string;
  id: number;
};

export enum Side {
  left = -1,
  right = 0,
  neutral = 1,
}

export enum PlayerSideSymbol {
  left = 'A',
  right = 'B',
  neutral = '-',
}

export type Participant = {
  name: string;
  players: Pick<Player, 'id'>[];
  side: Side;
};

export enum PlayersType {
  none = 'none',
  single = 'single',
  team = 'team',
  DYP = 'draw your partner',
  DYP2 = 'draw your partner second stage',
  MDYP = 'monster draw your partner',
}

export type Game = {
  participant1?: Participant;
  participant2?: Participant;
  nextGamePosition?: number;
  thirdPlaceGameId: number | null;
  firstParticipantScore: number[];
  secondParticipantScore: number[];
  nextGameId: number | null;
  next?: number | null;
  id: number;
  roundId: number | null;
};

export type SetupState = {
  participants: Participant[];
  games: Game[];
  rounds: DraftRound[];
  firstRoundGames: Game[];
  hasThirdPlaceGame: boolean;
};

export type DraftRound = {
  name: string;
  games: Game[];
};

export type PlayerResponse = {
  id: number;
  name: string;
  tournamentId: number | undefined;
  userId: number;
};

export type LocalPlayer = PlayerResponse & {
  isEdit: boolean;
  isChecked: boolean;
};

export type GroupResponse = {
  id: number;
  name: string;
  userId: number;
  players: PlayerResponse[];
};

export type PlayerWithInputValue = PlayerResponse & { inputValue?: string };

export type ArrangedParticipants = {
  right: Participant[];
  left: Participant[];
};

export interface ITournament {
  id: number;
  goalsToWin: number;
  winningSets: number;
  userId: number;
  tournamentTypeId: TournamentType;
  name: string;
  createdAt: string;
}

export interface IRound {
  id: number;
  name: string;
  tournamentId: number | null;
}

export interface ITournamentAllTogether extends ITournament {
  rounds: (IRound & {
    games: (Game & {
      participant1: Participant | null;
      participant2: Participant | null;
    })[];
  })[];
}

export interface IRoundAllTogether extends IRound {
  games: (Game & {
    participant1: Participant | null;
    participant2: Participant | null;
  })[];
}

export enum AsyncResponseStatus {
  idle = 'idle',
  loading = 'loading',
  rejected = 'rejected',
  fullfilled = 'fullfilled',
}

export type ObjectWithOneField<K extends string, T> = {
  [P in K]: T;
};

export type OnlyId = ObjectWithOneField<'id', number>;
export type OnlyName = ObjectWithOneField<'name', string>;

export type updateDataById<T> = {
  id: number;
  data: T;
};

export interface ReduxState<T> {
  data: T;
  error: null | string;
  status: AsyncResponseStatus;
}

export type ThunkError = {
  message: string;
};

export enum DigitButtonType {
  plus,
  minus,
}
