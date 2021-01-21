/**
 * @requirement Facebook SDK
 * @description place facebook/SDK after the opening body tag into your index.html
 * @example
 *  <script>
      window.fbAsyncInit = function () {
        FB.init({
          appId: '418722349558894',
          cookie: true,
          xfbml: true,
          version: 'v9.0',
        });

        FB.AppEvents.logPageView();
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    </script>
 */

const getFacebookData = (): Promise<FaceBookData> => {
  return new Promise((resolve, reject) => {
    if (window.FB) {
      // window.FB.getLoginStatus(function (response) {
      //   console.log(response);
      // });

      window.FB.login(
        (loginResponse: FacebookResponse): void => {
          const { authResponse } = loginResponse;
          window.FB.api(
            '/me',
            { fields: 'name, email, id' },
            (response: ApiResponse) => {
              if (response.email) {
                resolve({ ...authResponse, ...response });
              }
            },
          );
        },
        { scope: 'email' },
      );
    } else {
      reject('sdk is not loaded');
    }
  });
};

export default getFacebookData;
