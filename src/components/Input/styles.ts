import styled from '@emotion/styled';
import { media } from '../../../shared/styles';

export const Container = styled.div`
  display: flex;
  align-items: center;

  background-color: var(--gray);

  width: 352px;
  height: 40px;

  border-radius: 6px;

  transition: 0.3s;

  svg {
    color: var(--white);
    font-size: 22px;

    border-right: 1px solid var(--white);

    padding: 0 12px;
    height: 100%;
  }

  &:focus-within {
    outline: 1px solid var(--white);
  }

  ${media.maxMobile} {
    width: 260px;
    height: 32px;

    font-size: 0.7rem;

    svg {
      font-size: 0.8rem;
    }
  }
`;

export const InputBase = styled.input`
  all: unset;

  width: 100%;
  height: 100%;

  padding-left: 8px;

  color: var(--white);
`;
