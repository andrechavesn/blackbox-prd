import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface ContentProps {
  isOn: boolean;
}
export const Container = styled.span`
  min-width: 72px;
  height: 14px;

  border-radius: 24px;

  padding: 8px;

  background: var(--gray);

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: 0.3s;

  &:hover {
    filter: brightness(80%);
  }
`;
export const Content = styled.span<ContentProps>`
  width: 40px;
  height: 6px;

  display: flex;
  align-items: center;

  background: var(--white);

  outline: 1px solid gray;
  border-radius: 42px;

  padding: 8px 4px;

  transition: 0.5s;

  cursor: pointer;

  ${props =>
    props.isOn &&
    css`
      background: var(--dark);

      outline: 1px solid red;

      div {
        background: red;
        transform: translateX(22px);
      }
    `}
`;

export const Indicator = styled.div`
  width: 16px;
  height: 16px;

  border-radius: 50%;

  transition: 0.5s;

  background: var(--black);
`;
