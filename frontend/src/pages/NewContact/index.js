import { PageHeader } from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';
import { useNewContact } from './useNewContact';

export function NewContact() {
  const { contactFormRef, handleSubmit } = useNewContact();

  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm
        ref={contactFormRef}
        onSubmit={handleSubmit}
        buttonLabel="Cadastrar"
      />
    </>
  );
}
