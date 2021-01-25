import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  FC,
} from 'react';
import { AxiosResponse } from 'axios';
import { authRequest } from '../api';
import {
  ChangePasswordData,
  GoogleResponse,
  LoginResponse,
  SignFormData,
  User,
} from '../types/main.types';
import authStorage from './storage';
import getFacebookData from '../lib/facebook';
import { GoogleLoginResponse } from 'react-google-login';

type RequestData = {
  googleId: string;
  imageUrl: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
  tokenId: string;
};

type RegisterFormData = {
  email: string;
  password: string;
  displayName: string;
};

interface IAuthProvider {
  register: (data: RegisterFormData) => Promise<string>;
  resendRegisterMail: (data: RegisterFormData) => Promise<string>;
  login: (data: SignFormData<string>) => Promise<User>;
  user: User | false;
  logout: () => void;
  loginWithFacebook: () => Promise<User>;
  loginWithGoogle: (response: GoogleResponse) => Promise<User>;
  updatePassword: (data: ChangePasswordData) => Promise<AxiosResponse<any>>;
  resetPassword: (email: string) => Promise<AxiosResponse<any>>;
  setNewPassword: (
    password: string,
    token: string,
  ) => Promise<AxiosResponse<any>>;
}

const authContext = createContext<IAuthProvider>(undefined!);

export const ProvideAuth: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const refreshAccessToken = (refreshToken: string | null) => {
  if (!refreshToken) {
    console.error('no refresh token');
  }
  return authRequest.doPost('email/refreshToken', { token: refreshToken });
};

const useProvideAuth = (): IAuthProvider => {
  const [user, setUser] = useState<User | false>(undefined!);
  const [expiry, setExpiry] = useState<number | null>(
    () => authStorage.getExpiry() || null,
  );

  const register = async (data: RegisterFormData) => {
    const res = await authRequest.doPost('email', data);
    const { message } = res.data;

    return message;
  };

  const resendRegisterMail = async (data: RegisterFormData) => {
    const res = await authRequest.doPost('email/resend', data);
    const { message } = res.data;
    return message;
  };

  const login = async (data: SignFormData<string>) => {
    const res: AxiosResponse<LoginResponse> = await authRequest.doPost(
      'email/login',
      data,
    );
    const resData = res.data;
    const { user } = resData;

    authStorage.setTokens(resData);
    setUser(user);

    return user;
  };

  const loginWithFacebook = async () => {
    const info: FaceBookData = await getFacebookData();

    const response: AxiosResponse<LoginResponse> = await authRequest.doPost(
      'facebook',
      info,
    );

    const { data } = response;
    const { user } = data;

    authStorage.setTokens(data);
    setUser(user);

    return user;
  };

  const loginWithGoogle = async (response: GoogleResponse): Promise<User> => {
    const googleResponse = response as GoogleLoginResponse;
    const requestData: RequestData = {
      tokenId: googleResponse.tokenId,
      ...googleResponse.profileObj,
    };

    const res = await authRequest.doPost('google', requestData);
    const { data } = res;
    const { user } = data;

    authStorage.setTokens(data);
    setUser(user);

    return user;
  };

  const updatePassword = async (data: ChangePasswordData) => {
    const update = await authRequest.doUpdate('email/update-password', data);
    return update;
  };

  const resetPassword = async (email: string) => {
    const response = await authRequest.doPost('email/reset-password?lang=en', {
      email,
    });
    return response;
  };

  const setNewPassword = async (password: string, token: string) => {
    const response = await authRequest.doPost('email/confirm-password', {
      password,
      token,
    });
    return response;
  };

  const logout = () => {
    setUser(false);
    setExpiry(null);
    authStorage.clear();
  };

  useEffect(() => {
    const refreshToken = authStorage.getRefreshToken();
    const accessToken = authStorage.getAccessToken();
    const now = Date.now();

    let timerId: NodeJS.Timeout;
    if (expiry) {
      if (expiry > now && !user) {
        authRequest
          .doPost('/auto-login', {
            token: accessToken,
          })
          .then((res) => {
            const data = res.data;
            setUser(data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
      if (expiry < now && !user) {
        refreshAccessToken(refreshToken)
          .then((res: AxiosResponse<any>) => {
            const { data } = res;
            authStorage.updateAccessTokenAndExpiry(
              data.accessToken,
              data.expiry,
            );
            setExpiry(data.expiry);
          })
          .catch((err) => {
            authStorage.clear();
            console.error(err);
          });
      }

      timerId = setInterval(() => {
        const diff = Math.floor((expiry - Date.now()) / 1000 / 60);
        if (!refreshToken) {
          clearInterval(timerId);
        }

        if (diff < 2) {
          refreshAccessToken(refreshToken)
            .then((res: AxiosResponse<any>) => {
              const { data } = res;
              authStorage.updateAccessTokenAndExpiry(
                data.accessToken,
                data.expiry,
              );
              setExpiry(data.expiry);
            })
            .catch((err) => {
              authStorage.clear();
              console.error(err);
            });
        }
      }, 10 * 1000);
    }
    return (): void => {
      clearInterval(timerId);
    };
  }, [expiry, user]);

  return {
    register,
    resendRegisterMail,
    login,
    logout,
    user,
    loginWithFacebook,
    loginWithGoogle,
    updatePassword,
    resetPassword,
    setNewPassword,
  };
};

export default useAuth;
