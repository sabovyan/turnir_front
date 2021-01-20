import { LoginResponse } from '../types/main.types';

interface IAuthStorage {
  setTokens: (data: LoginResponse) => void;
  getAccessToken: () => string | null;
  getExpiry: () => number;
  getRefreshToken: () => string | null;
  updateAccessTokenAndExpiry: (accessToken: string, expiry: number) => void;
  clear: () => void;
}

class AuthLocalStorage implements IAuthStorage {
  setTokens(data: LoginResponse) {
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('expiry', String(data.expiry));
  }

  updateAccessTokenAndExpiry(accessToken: string, expiry: number) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expiry', String(expiry));
  }

  getExpiry() {
    return Number(localStorage.getItem('expiry'));
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  clear() {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiry');
  }
}

const authStorage = new AuthLocalStorage();

export default authStorage;
