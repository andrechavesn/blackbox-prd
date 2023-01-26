import styled from '@emotion/styled';

interface SidebarProps {
  isOpen: boolean;
}

export const Main = styled.section`
  width: 100vw;
  max-height: 100vh;

  display: flex;

  background-color: var(--white);
  color: var(--black);

  position: fixed;
`;

export const Container = styled.aside<SidebarProps>`
  width: ${props => (props.isOpen ? '250px' : '32px')};
  height: 100vh;

  transition: width 0.5s ease-in-out;

  background-color: var(--black);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  padding: 16px;

  color: var(--white);
  position: relative;
`;
export const Header = styled.header`
  width: 100%;
  padding-top: 32px;
`;
export const TitleBox = styled.div`
  display: flex;
  width: 100%;

  gap: 56px;
  transition: 0.5s ease-in-out;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.img`
  width: 90px;
`;

export const ButtonsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  padding-top: 24px;
`;
