const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || "{clientId}";
const ISSUER =
  process.env.REACT_APP_ISSUER || "https://{yourOktaDomain}.com/oauth2/default";

export default {
  oidc: {
    issuer: ISSUER,
    clientId: CLIENT_ID,
    redirectUri: window.location.origin + "/implicit/callback",
    pkce: true
  }
};
