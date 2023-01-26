import { useEffect, useState } from 'react';
import { Container, Logo } from './styles';

export function SplashScreen() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 700);
  }, []);
  return (
    <Container>
      <Logo src="/assets/logo.svg" alt="logo" isLoaded={isLoaded} />
    </Container>
  );
}
