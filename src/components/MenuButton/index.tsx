import { Container, Content } from './styles';

interface MobileButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  handleClick: () => void;
  isOpen: boolean;
}
export function MenuButton({
  handleClick,
  isOpen,
  ...rest
}: MobileButtonProps) {
  return (
    <Container {...rest} onClick={handleClick}>
      <Content isOpen={isOpen} />
    </Container>
  );
}
