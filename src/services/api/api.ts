import axios from 'axios';

export const api = axios.create({
  baseURL:
    'http://web-dev.eba-jrk4uvgx.eu-west-1.elasticbeanstalk.com/api/Account',
});
