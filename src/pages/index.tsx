import { IoPerson, IoLockClosed } from 'react-icons/io5';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';
import { Container, Content, Logo } from '../../shared/login.styles';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { push } = useRouter();
  return (
    <Container>
      <Content onSubmit={handleSubmit(() => push('/Home'))}>
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
