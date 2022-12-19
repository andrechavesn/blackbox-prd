import { ComponentType } from 'react';
import { IconBaseProps } from 'react-icons';
import { ButtonBase, Container, IconBox, Loading } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: ComponentType<IconBaseProps>;
  isLoading?: boolean;
  size?: 'small' | 'normal' | 'large';
}

export function Button({
  icon: Icon,
  children,
  isLoading,
  size = 'normal',
  ...rest
}: ButtonProps) {
  return (
    <Container size={size}>
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
