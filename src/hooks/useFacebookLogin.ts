import { useCallback, useEffect, useState } from 'react';
import { FACEBOOK_ID } from '../config/envConstants';

/**
 * @requirement Facebook SDK
 * @description place facebook/SDK after the opening body tag into your index.html
 */

type State = AuthResponse | (AuthResponse & ApiResponse) | ApiResponse | null;

const useFacebookLogin = () => {
  const [userInfo, setUserInfo] = useState<State>(null);

  const login = () => {
    if (window.FB) {
      window.FB.login(
        (loginResponse: FacebookResponse): void => {
          const { authResponse } = loginResponse;

          window.FB.api(
            '/me',
            { fields: 'name, email, id' },
            (response: ApiResponse) => {
              if (response.email) {
                setUserInfo({ ...authResponse, ...response });
              }
            },
          );
        },
        {
          scope: 'email',
        },
      );
    } else {
      console.error('sdk is not loaded');
    }
  };

  const fbAsyncInit = useCallback(() => {
    window.FB.init({
      appId: FACEBOOK_ID,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v9.0',
    });
  }, []);

  useEffect(() => {
    // fbAsyncInit();
  });

  return { userInfo, login };
};

export default useFacebookLogin;
