import λ from 'apex.js';
import request from 'axios';
import qs from 'query-string';

const {
  client_secret,
  client_id,
  redirect_uri,
  url,
} = process.env;

const accessURL = ({ code, refresh_token }) =>
  `${url}/token?${qs.stringify({
    grant_type: code ? 'authorization_code' : 'refresh_token',
    code,
    refresh_token,
    client_id,
    client_secret,
    redirect_uri,
  })}`;

export default λ(async (event) => {
  // receives AUTHORIZATION_CODE or REFRESH_TOKEN
  try {
    // requests access_token using client id and secret along with AUTHORIZATION_CODE
    // returns payload as is back to requesting application
    // return await request.post(accessURL({ code, refresh_token }));
    // return { url: accessURL(), msg: 'testing' };
    console.log(process.env);
    return { ...event, url: accessURL(event) };
  } catch (error) {
    return error;
  }
});
