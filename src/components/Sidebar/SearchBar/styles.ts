import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;

  background-color: var(--gray);

  max-width: 200px;
  height: 32px;

  padding-left: 8px;

  border-radius: 6px;

  transition: 0.3s;

  svg {
    color: var(--white);
  }
`;

export const InputBase = styled.input`
  outline: none;
  background: transparent;
  border: none;

  color: var(--white);
  padding-left: 8px;

  &:focus {
    outline: none;
  }
`;
