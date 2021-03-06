import λ from 'apex.js';
import request from 'axios';
import qs from 'query-string';

const {
  client_secret_dev,
  client_id_dev,
  redirect_uri_dev,
  url,
} = process.env;

const accessURL = ({ code, refresh_token }) =>
  `${url}?${qs.stringify({
    grant_type: code ? 'authorization_code' : 'refresh_token',
    code,
    refresh_token,
    client_id: client_id_dev,
    client_secret: client_secret_dev,
    redirect_uri: redirect_uri_dev,
  })}`;

export default λ(async (event) => {
  try {
    const { data } = await request.post(accessURL(event));
    return data;
  } catch (error) {
    return error;
  }
});
