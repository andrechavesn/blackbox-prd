import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'blacbox.token': token } = parseCookies();
export const api = axios.create({
  baseURL: 'https://www.black-box.uk/api',
  // setToken
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
