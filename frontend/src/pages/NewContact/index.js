import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { PageHeader } from '../../components/PageHeader';
import { Button } from '../../components/Button';

export function NewContact() {
  return (
    <div>
      <PageHeader title="Novo contato" />

      <Input type="text" placeholder="Nome" />
      <Select>
        <option value="1">Instagram</option>
        <option value="1">Instagram</option>
        <option value="1">Instagram</option>
        <option value="1">Instagram</option>
        <option value="1">Instagram</option>
      </Select>
      <Button>
        Salvar alterações
      </Button>
      <Button disabled>
        Salvar alterações
      </Button>
    </div>
  );
}
