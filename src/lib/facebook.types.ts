declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: FB;
  }

  type ScopeOptions = {
    scope: string;
    return_scopes?: boolean;
  };

  type APIOptions = {
    fields: string;
  };

  interface FB {
    getLoginStatus: (cb: loginCallBack) => void;
    init: (props: InitParams) => void;
    login: (cb: loginCallBack, options?: ScopeOptions) => void;
    api: (pointer: string, options: APIOptions, cb: apiCallback) => void;
  }

  type ApiResponse = {
    id?: string;
    email?: string;
    name?: string;
  };

  type apiCallback = (response: ApiResponse) => void;

  /* function properties / options */

  interface InitParams {
    appId?: string;
    version: string;
    cookie?: boolean;
    status?: boolean;
    xfbml?: boolean;
    frictionlessRequests?: boolean;
    hideFlashCallback?: boolean;
    autoLogAppEvents?: boolean;
  }

  interface FacebookResponse {
    status: Status;
    authResponse: AuthResponse;
  }

  type loginCallBack = (response: FacebookResponse) => void;

  type Status = 'connected' | 'not_authorized' | 'unknown';

  type AuthResponse = {
    accessToken: string;
    expiresIn: number | Date;
    // The amount of time before the login expires, in seconds, and the person will need to login again.
    data_access_expiration_time: number | Date;

    // A signed parameter that contains information about the person using your webpage.
    signedRequest: string;

    userID: string;
    graphDomain: 'facebook';
  };

  type FaceBookData = AuthResponse & ApiResponse;
}

export default global;
