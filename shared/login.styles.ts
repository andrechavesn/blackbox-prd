import styled from '@emotion/styled';
import { media } from './styles';

export const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;
  background: var(--black);
`;

export const Content = styled.form`
  width: 400px;
  height: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;

  background: var(--dark);

  border-top: 12px solid var(--white);
  border-radius: 8px;

  ${media.maxMobile} {
    width: 300px;
    height: 320px;
  }
`;

export const Logo = styled.img`
  width: 120px;
  ${media.maxMobile} {
    width: 80px;
  }
`;
