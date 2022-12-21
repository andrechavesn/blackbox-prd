import axios from 'axios';
import { headers } from '../../utils/Headers';

export const api = axios.create({
  baseURL: 'https://web-dev.eba-jrk4uvgx.eu-west-1.elasticbeanstalk.com/api',
});
