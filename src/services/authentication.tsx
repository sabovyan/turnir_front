import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  FC,
} from 'react';
import { AxiosResponse } from 'axios';
import { authRequest } from '../api';
import { LoginResponse, SignFormData, User } from '../types/main.types';
import authStorage from './storage';

const authContext = createContext<any>(null);

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

const useProvideAuth = (): {
  login: (data: SignFormData<string>) => Promise<User>;
  user: User | undefined;
} => {
  const [user, setUser] = useState<User>();
  const [expiry, setExpiry] = useState<number | null>(
    () => authStorage.getExpiry() || null,
  );

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
      }, 2 * 1000);
    }
    return (): void => {
      clearInterval(timerId);
    };
  }, [expiry, user]);

  return {
    login,
    user,
  };
};

export default useAuth;
