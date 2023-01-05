import { ComponentType } from 'react';
import { IconBaseProps } from 'react-icons';
import { ButtonBase, Container, IconBox, Loading } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: ComponentType<IconBaseProps>;
  isLoading?: boolean;
  size?: 'small' | 'normal' | 'large';

  style?: {
    color?: string;
    bgColor?: string;
  };
}

export function Button({
  icon: Icon,
  style,
  children,
  isLoading,
  size = 'normal',
  ...rest
}: ButtonProps) {
  return (
    <Container
      size={size}
      style={{
        color: style?.color,
        backgroundColor: style?.bgColor,
      }}
    >
      {Icon ? (
        <ButtonBase {...rest}>
          <IconBox>
            <Icon />
            {isLoading ? <Loading /> : children}
          </IconBox>
        </ButtonBase>
      ) : (
        <ButtonBase {...rest}> {isLoading ? <Loading /> : children}</ButtonBase>
      )}
    </Container>
  );
}
