import { IoPerson, IoLockClosed } from 'react-icons/io5';
import { useForm } from 'react-hook-form';

import { useContext, useState } from 'react';
import { Container, Content, Logo } from '../../shared/login.styles';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
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
          placeholder="Name"
        />
        <Input
          register={register}
          required
          name="password"
          type="password"
          icon={IoLockClosed}
          placeholder="Password"
        />
        <Button
          type="submit"
          size="large"
          isLoading={isLoading}
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
          }}
        >
          Login
        </Button>
      </Content>
    </Container>
  );
}
