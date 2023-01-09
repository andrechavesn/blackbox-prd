import styled from '@emotion/styled';

interface ContentProps {
  isOpen: boolean;
}
export const Container = styled.div`
  display: flex;
  position: absolute;

  font-size: 1rem;

  border: none;
  cursor: pointer;
  background: none;
  gap: 0.5rem;
`;

export const Content = styled.span<ContentProps>`
  border-top: 2px solid;
  width: 20px;
  border-top-color: ${props => (props.isOpen ? 'transparent' : 'var(--white)')};

  &:after,
  &:before {
    width: 20px;
    height: 2px;

    background: var(--white);

    content: '';

    display: block;

    margin-top: 5px;

    position: relative;

    transition: 0.3s;
  }

  &:before {
    transform: ${props => props.isOpen && 'rotate(135deg)'};
  }

  &:after {
    transform: ${props => props.isOpen && 'rotate(-135deg)'};
    top: ${props => props.isOpen && '-7px'};
  }

  &:hover {
    opacity: 0.75;
  }
`;
