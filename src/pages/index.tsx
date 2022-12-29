import { IoPerson, IoLockClosed } from 'react-icons/io5';
import { useForm } from 'react-hook-form';

import { useContext } from 'react';
import { Container, Content, Logo } from '../../shared/login.styles';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

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
        <Button type="submit" size="large">
          Login
        </Button>
      </Content>
    </Container>
  );
}
