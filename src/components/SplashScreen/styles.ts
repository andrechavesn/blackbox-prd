import styled from '@emotion/styled';

export interface LogoProps {
  isLoaded: boolean;
}

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--black);

  width: 100vw;
  animation: splash 1.3s ease-in-out;
`;

export const Logo = styled.img<LogoProps>`
  position: absolute;
  transform: ${props => props.isLoaded && 'translateY(-800px)'};
  transition: 0.4s;
`;
