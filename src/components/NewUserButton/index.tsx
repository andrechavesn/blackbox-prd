import { IoPersonAdd } from 'react-icons/io5';
import Tooltip from '@mui/material/Tooltip';
import { Container, Content, Indicator } from './styles';

interface SwitchProps {
  isOn: boolean;
  onChangeRequest: () => void;
}

export function NewUserButton({ isOn, onChangeRequest }: SwitchProps) {
  return (
    <Tooltip title="Users config">
      <Container>
        <IoPersonAdd />
        <Content
          isOn={isOn}
          onClick={() => {
            onChangeRequest();
          }}
        >
          <Indicator />
        </Content>
      </Container>
    </Tooltip>
  );
}
