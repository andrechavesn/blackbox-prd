import styled from '@emotion/styled';

export const Main = styled.section`
  width: 100vw;
  max-height: 100vh;

  display: flex;

  background-color: var(--white);
  color: var(--black);
`;

export const Container = styled.aside`
  width: 250px;
  height: 100vh;

  padding: 16px;

  background-color: var(--black);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;

  color: var(--white);
`;
export const Header = styled.header``;
export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const Circle = styled.div`
  width: 12px;
  height: 12px;

  border-radius: 50%;
  background-color: ${props => props.color};
`;
export const Title = styled.h1`
  font-size: 1.5rem;
`;

export const Content = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
