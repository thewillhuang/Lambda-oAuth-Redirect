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
  try {
    const { data } = await request.post(accessURL(event));
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
});
