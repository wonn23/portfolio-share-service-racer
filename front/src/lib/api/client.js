import axios from 'axios';

const backendPortNumber = '5001';
export const serverUrl = `http://${window.location.hostname}:${backendPortNumber}/`;

const client = axios.create();
client.defaults.baseURL = serverUrl;

export default client;
