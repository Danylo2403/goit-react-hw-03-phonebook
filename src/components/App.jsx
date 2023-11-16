import React, { Component } from 'react';
import { AppLayout } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  // Додає новий контакт до списку, перевіряючи наявність дублікатів
  addContact = newContact => {
    // Перевірка наявності дублікатів в контактах
    const isDuplicateContact = this.state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    // Додаємо контакт до списку тільки, якщо його ще немає у списку
    isDuplicateContact
      ? alert(`${newContact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  // Видаляє контакт за його ідентифікатором
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== contactId),
    }));
  };

  // Оновлює значення фільтрації контактів
  updateFilter = filterString => {
    this.setState({ filter: filterString });
  };

  render() {
    const { contacts, filter } = this.state;
    // Фільтрує контакти згідно з введеним текстом фільтрації
    const filteredContacts = contacts.filter(item => {
      return item.name.toLowerCase().includes(filter.toLowerCase());
    });

    return (
      <AppLayout>
        <h1>Phonebook</h1>
        {/* Компонент для додавання нових контактів */}
        <ContactForm onAddContact={this.addContact} />

        {/* Умовний рендеринг списку контактів та фільтра */}
        {contacts.length > 0 && (
          <ContactList
            contacts={filteredContacts}
            filter={filter}
            onUpdateFilter={this.updateFilter}
            onDelete={this.deleteContact}
          />
        )}
      </AppLayout>
    );
  }
}

export default App;
