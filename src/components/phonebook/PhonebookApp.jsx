import { useEffect, useState } from 'react';
import ContactForm from '../contact-form/ContactForm';
import ContactList from '../contact-list/ContactList';
import Filter from '../filter/Filter';
import { useDispatch } from 'react-redux';
import { deleteContacts, fetchContacts, postContacts } from '../../redux/operators';
import { useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';




function PhonebookApp() {

    const [state, setState] = useState({
    name: '',
    number: '',
  });
  const dispatch = useDispatch();
  
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    setState(storedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state));
  }, [state]);

  function handleNameChange (event)  {
    setState({ ...state, name: event.target.value });
  };

  function handleNumberChange  (event)  {
    setState({ ...state, number: event.target.value });
  };


const contacts = useSelector(getContacts);
  function handleSubmit(event) {
    event.preventDefault();
    

    const existingContactName = contacts.some(
      contact => contact.name.toLowerCase() === state.name.toLowerCase() 
    )
    const existingContactNumber = contacts.some(
      contact => contact.number === state.number 
    )
    if (existingContactName) {
      alert(`${state.name} is already in the phonebook!`);
      return;
    }
    if (existingContactNumber) {
      alert(`${state.number} is already in the phonebook!`);
      return;
    }

    
    if (state.number.trim()  === "") {
      event.preventDefault();
      alert(`Please write  name and phone number`);
      return;
    }
    if (state.name.trim()  === "") {
      event.preventDefault();
      alert(`Please write  name and phone number`);
      return;
    }


    dispatch(postContacts(state)).then(() => {
      dispatch(fetchContacts());
    });
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
        name={state.name}
        number={state.number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Contacts</h2>
      <Filter value={state.filter}  />
      <ContactList    handleDelete={handleDelete} />
    </div>
  );
}

export default PhonebookApp;