import { ComponentType } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { IconBaseProps } from 'react-icons';
import { Container, InputBase } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: ComponentType<IconBaseProps>;
  register: UseFormRegister<FieldValues>;
}

export function Input({
  icon: Icon,
  register,
  required,
  name,
  ...rest
}: InputProps) {
  return (
    <Container>
      <Icon />
      <InputBase {...register(name, { required })} {...rest} />
    </Container>
  );
}
