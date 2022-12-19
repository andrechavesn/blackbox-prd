import { IoSearch } from 'react-icons/io5';
import { Container, InputBase } from './styles';

type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement>;

export function SearchBar({ ...rest }: SearchBarProps) {
  return (
    <Container>
      <IoSearch />
      <InputBase placeholder="Search" {...rest} />
    </Container>
  );
}
