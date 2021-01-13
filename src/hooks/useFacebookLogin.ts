import { useCallback, useEffect, useRef, useState } from 'react';
import { FACEBOOK_ID } from '../config/envConstants';

/**
 * @requirement Facebook SDK
 * @description insert facebook login SDK after the opening body tag into your index.html
 */

const useFacebookLogin = () => {
  const [userInfo, setUserInfo] = useState<AuthResponse | null>(null);

  const login = () => {
    window.FB.login((response: FacebookResponse): void => {
      setUserInfo(response.authResponse);
    });
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
    fbAsyncInit();

    window.FB.getLoginStatus((response) => {
      setUserInfo(response.authResponse);
    });
  });

  return { userInfo, login };
};

export default useFacebookLogin;
