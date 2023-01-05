import { RiAdminFill } from 'react-icons/ri';
import { Container, Content, Indicator } from './styles';

interface SwitchProps {
  isOn: boolean;
  onChangeRequest: () => void;
}

export function Switch({ isOn, onChangeRequest }: SwitchProps) {
  return (
    <Container>
      <RiAdminFill />
      <Content isOn={isOn} onClick={onChangeRequest}>
        <Indicator />
      </Content>
    </Container>
  );
}
