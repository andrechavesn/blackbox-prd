import styled from '@emotion/styled';

interface TitleBoxProps {
  adminMode: boolean;
}
export const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 180px;
  overflow-y: auto;
  position: relative;
`;
export const TitleBox = styled.div<TitleBoxProps>`
  background-color: var(--white);
  height: 48px;

  display: flex;
  align-items: center;
  gap: ${props => !props.adminMode && '12px'};
  justify-content: ${props => props.adminMode && 'space-between'};

  padding: 0 16px;

  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  svg {
    color: var(--black);
    font-size: 1.4rem;

    cursor: pointer;
    transition: 0.3s;

    &:hover {
      opacity: 0.6;

      transform: scale(1.1);
    }
  }
`;

export const Title = styled.h3`
  font-size: 1.2rem;
  color: var(--black);
`;

export const Content = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 16px;

  max-height: 250px;
  width: 200px;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: var(--black);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--white);
    border-radius: 8px;
  }
`;

export const ChannelsList = styled.div`
  display: flex;
  flex-direction: column;
`;
