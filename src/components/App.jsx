import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle';
import { Layout, TitlePhonebook, TitleContacts } from './Layout';
import { useState } from 'react';


export default function App () {
  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const isExist = contacts.some(
      evt =>
        (evt.name === newContact.name && evt.number === newContact.number) ||
        evt.number === newContact.number
    );

    if (isExist) {
      alert(`${name} or ${number} is already in contacts.`);
      return;
    }

    setContacts(prevState => [...prevState, newContact]);
  };

  const changeFilter = ({ currentTarget }) => {
    setFilter(currentTarget.value);
  };

  const getFilteredConracts = () => {
    return contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filter.toLowerCase());
    });
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

    return (
      <Layout>
        <GlobalStyle />

        <TitlePhonebook>Phonebook</TitlePhonebook>
        <ContactForm onSubmit={addContact} />

        <TitleContacts>Contacts</TitleContacts>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={getFilteredConracts()}
          onDelete={deleteContact}
        />
      </Layout>
    );
}
