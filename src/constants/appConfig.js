const APPCONFIG = {
    // apiUri: 'http://127.0.0.1:81/api/',
    // baseName: '/',
    apiUri: process.env.REACT_APP_API_URI ? process.env.REACT_APP_API_URI : 'https://pay.ragnarok.mobi/api/',
    // apiUri: 'http://103.92.25.253:82/testweb/api/public/api/',
    baseName: '/',
    privacyPolicyUrl: process.env.REACT_APP_POLICY_URL ? process.env.REACT_APP_POLICY_URL : 'https://ragnarok.mobi/Privacy-Policy/',
    socketUrl: process.env.REACT_APP_SOCKET_URI ? process.env.REACT_APP_SOCKET_URI : 'ragnarok.mobi:8868',
}
export default APPCONFIG;