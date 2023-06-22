import React, { useEffect, useState } from 'react';
import ContactForm from '../contact-form/ContactForm';
import ContactList from '../contact-list/ContactList';
import Filter from '../filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts, fetchContacts, postContacts } from '../../redux/operators';
import { getContacts } from '../../redux/selectors';




function PhonebookApp() {
const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  //   const [state, setState] = useState({
  //   name: '',
  //   number: '',
  // });
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    setName(storedContacts.name || '');
    setNumber(storedContacts.number || '');
    // setState(storedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify({ name, number }));
  }, [name, number]);

  function handleNameChange (event)  {
    setName(event.target.value);
  };

  function handleNumberChange  (event)  {
    setNumber(event.target.value);
  };



  // function handleSubmit(event) {
  //   event.preventDefault();
    function handleSubmit(event) {
    event.preventDefault();

    const existingContactName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase() 
    )
    const existingContactNumber = contacts.find(
      contact => contact.phone === number 
    )
    if (existingContactName) {
      alert(`${name} is already in the phonebook!`);
      return;
    }
    if (existingContactNumber) {
      alert(`${number} is already in the phonebook!`);
      return;
    }

    
    // if (state.number.trim()  === "") {
    //   event.preventDefault();
    //   alert(`Please write  name and phone number`);
    //   return;
    // }
    // if (state.name.trim()  === "") {
    //   event.preventDefault();
    //   alert(`Please write  name and phone number`);
    //   return;
    // }
    if (number.trim() === '' || name.trim() === '') {
      alert('Please enter a name and phone number');
      return;
    }

    dispatch(postContacts({ name, number })).then(() => {
      dispatch(fetchContacts());
    });
      
    setName('');
    setNumber('');  
  };
  
  function handleDelete  (id)  {
    dispatch(deleteContacts(id)).then(() => {
      dispatch(fetchContacts());
    });
  };

  
  

  return (
    <div>
      <h1>Contact Book</h1>
      <ContactForm
        name={name}
        number={number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Contacts</h2>
      <Filter   />
      <ContactList    handleDelete={handleDelete} />
    </div>
  );
}

export default PhonebookApp;