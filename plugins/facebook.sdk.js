import Vue from 'vue'

const FbSdk = {}

FbSdk.install = function install (Vue, options) {
  /* eslint-disable */
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ko_KR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  /* eslint-enable */
  window.fbAsyncInit = function onSDKInit () {
    window.FB.init(options)
    window.dispatchEvent(new Event('fb-sdk-ready'))
  }
}

Vue.use(FbSdk, {
  appId: '412088989153388',
  xfbml: true,
  version: 'v2.9'
})
