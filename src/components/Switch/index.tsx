import { RiAdminFill } from 'react-icons/ri';
import Tooltip from '@mui/material/Tooltip';
import { Container, Content, Indicator } from './styles';

interface SwitchProps {
  isOn: boolean;
  onChangeRequest: () => void;
}

export function Switch({ isOn, onChangeRequest }: SwitchProps) {
  return (
    <Tooltip title="Edit mode">
      <Container>
        <RiAdminFill />
        <Content isOn={isOn} onClick={onChangeRequest}>
          <Indicator />
        </Content>
      </Container>
    </Tooltip>
  );
}
