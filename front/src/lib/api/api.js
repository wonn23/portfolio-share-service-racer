/* eslint-disable prefer-template */
import client, { serverUrl } from './client';

export const get = async (endpoint, params = '') => {
  console.log(
    `%cGET 요청 ${serverUrl + endpoint + '/' + params}`,
    'color: #a25cd1;',
  );

  return client.get(`${endpoint}/${params}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
    },
  });
};

export const post = async (endpoint, data) => {
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST 요청: ${serverUrl + endpoint}`, 'color: #296aba;');
  console.log(`%cPOST 요청 데이터: ${bodyData}`, 'color: #296aba;');

  return client.post(endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
    },
  });
};

export const put = async (endpoint, data) => {
  const bodyData = JSON.stringify(data);
  console.log(`%cPUT 요청: ${serverUrl + endpoint}`, 'color: #059c4b;');
  console.log(`%cPUT 요청 데이터: ${bodyData}`, 'color: #059c4b;');

  return client.put(endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
    },
  });
};

export const del = async (endpoint, params = '') => {
  console.log(`DELETE 요청 ${serverUrl + endpoint + '/' + params}`);
  return client.delete(serverUrl + endpoint + '/' + params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
    },
  });
};
