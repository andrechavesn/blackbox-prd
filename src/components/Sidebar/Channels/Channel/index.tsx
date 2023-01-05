import { FaTrashAlt } from 'react-icons/fa';
import { IoSettingsSharp, IoPlay } from 'react-icons/io5';
import { Container, Content, EditBox } from './styles';

interface ChannelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  adminMode?: boolean;

  ChannelTasks: {
    handleDeleteChannel: () => void;
    handleEditChannel: () => void;
    handlePlayChannel: () => void;
  };
}

export function Channel({
  children,
  adminMode,
  ChannelTasks,
  ...rest
}: ChannelProps): JSX.Element {
  return (
    <Container adminMode={adminMode} {...rest}>
      <Content>
        {children}
        {adminMode && (
          <EditBox>
            <FaTrashAlt
              color="red"
              onClick={ChannelTasks.handleDeleteChannel}
            />
            <IoSettingsSharp onClick={ChannelTasks.handleEditChannel} />
            <IoPlay color="#02C39A" onClick={ChannelTasks.handlePlayChannel} />
          </EditBox>
        )}
      </Content>
    </Container>
  );
}
