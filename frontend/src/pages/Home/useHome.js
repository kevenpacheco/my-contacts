import {
  useCallback,
  useEffect,
  useState,
  useDeferredValue,
  useMemo,
} from 'react';

import toast from '../../utils/toast';
import ContactsService from '../../services/ContactsService';

export function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(
    () => contacts.filter(
      (contact) => contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()),
    ),
    [contacts, deferredSearchTerm],
  );

  const loadContacts = useCallback(
    async (signal) => {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts(
          orderBy,
          signal,
        );

        setHasError(false);
        setContacts(contactsList);
      } catch (error) {
        const isAbortError = error instanceof DOMException && error.name === 'AbortError';
        if (!isAbortError) {
          setHasError(true);
          setContacts([]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [orderBy],
  );

  useEffect(() => {
    const controller = new AbortController();

    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  function handleChangeSearchTerm(event) {
    const { value } = event.target;

    setSearchTerm(value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }, []);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));
      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    contacts,
    isLoading,
    hasError,
    isDeleteModalVisible,
    isLoadingDelete,
    filteredContacts,
    contactBeingDeleted,
    orderBy,
    searchTerm,
    handleCloseDeleteModal,
    handleToggleOrderBy,
    handleChangeSearchTerm,
    handleTryAgain,
    handleDeleteContact,
    handleConfirmDeleteContact,
  };
}
