import styled from '@emotion/styled';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
`;
export const TitleBox = styled.div`
  background-color: var(--white);
  height: 48px;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 0 16px;

  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
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
export const Channel = styled.span`
  padding: 12px;
  border: 1px solid var(--white);

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background-color: var(--dark);
  }
`;
