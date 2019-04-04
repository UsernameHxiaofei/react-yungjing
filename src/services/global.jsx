import jsonp from 'jsonp-promise';

export async function fetchUser() {
  const resp = await jsonp(`${window.location.protocol}//www.souche-inc.com/sso/httpApi/getAuthZ.jsonp`).promise;
  return resp.data;
}
