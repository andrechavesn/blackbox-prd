import styled from '@emotion/styled';

interface ContainerProps {
  adminMode: boolean;
}

export const Container = styled.span<ContainerProps>`
  padding: 8px;
  min-height: 16px;
  border: 1px solid var(--white);
  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background-color: ${props => (props.adminMode ? 'none' : ' var(--dark)')};
  }
`;

export const Content = styled.div``;

export const EditBox = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 8px;
  svg {
    transition: 0.2s;

    cursor: pointer;

    &:hover {
      opacity: 0.5;
      font-size: 0.9rem;
    }
  }
`;
