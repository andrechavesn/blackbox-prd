import styled from '@emotion/styled';
import { media } from '../../../shared/styles';

interface ContainerProps {
  size?: 'small' | 'normal' | 'large';

  style?: {
    color?: string;
    bgColor?: string;
  };
}

export const Container = styled.div<ContainerProps>`
  width: ${props =>
    props.size === 'normal'
      ? ' 200px'
      : props.size === 'large'
      ? '352px'
      : '160px'};
  height: 40px;

  background-color: ${props => props.style.bgColor || 'var(--white)'};
  border-radius: 6px;

  font-weight: bold;
  font-size: 1.2rem;
  color: ${props => props.style.color || 'var(--black)'};

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    backdrop-filter: brightness(0.9);
  }

  &:active {
    backdrop-filter: brightness(0.8);
  }

  ${media.maxMobile} {
    width: 260px;
    height: 32px;

    font-size: 0.7rem;
  }
`;

export const IconBox = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 24px;
`;
export const ButtonBase = styled.button`
  all: unset;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled.div`
  width: 16px;
  height: 16px;

  border: 3px solid var(--white);
  border-top: 3px solid var(--black);
  border-right: 3px solid var(--black);

  border-radius: 50%;
  margin: 0 auto;
  animation: loading 0.5s linear infinite;
`;
