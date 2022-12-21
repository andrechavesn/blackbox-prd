import { useContext } from 'react';
import { IoPerson, IoLockClosed } from 'react-icons/io5';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import FormData from 'form-data';
import { Container, Content, Logo } from '../../shared/login.styles';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn, isLoading } = useContext(AuthContext);
  const data = new FormData();
  data.append('username', 'andre');
  data.append('password', '123456');

  const config = {
    method: 'post',
    url: 'http://web-dev.eba-jrk4uvgx.eu-west-1.elasticbeanstalk.com/api/Account',
    headers: {
      accept: '/',
      ...data.getHeaders(),
    },
    data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  return (
    <Container>
      <Content onSubmit={handleSubmit(signIn)}>
        <Logo src="/assets/logo.svg" alt="Logo" />
        <Input
          register={register}
          required
          name="username"
          type="text"
          icon={IoPerson}
          placeholder="Nome"
        />
        <Input
          register={register}
          required
          name="password"
          type="password"
          icon={IoLockClosed}
          placeholder="Senha"
        />
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          size="large"
        >
          Login
        </Button>
      </Content>
    </Container>
  );
}
