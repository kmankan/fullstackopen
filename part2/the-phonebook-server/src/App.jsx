import { useEffect, useState } from 'react';
// we need to install this dependency at the root level for this to work (npm install axios)
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  // tracks state for names and numbers being input
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  // keep track of what is being typed in the filter field
  const [filterText, setFilterText] = useState('');
  // create a copy of the persons array which we can filter with the filterText input
  const [filteredList, setFilteredList] = useState([...persons]);
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }

  useEffect(hook, []);
  
  // using the useEffect hook to update the filteredList state whenever the persons state changes
  // i.e. when a new person is added
  useEffect(() => {
    setFilteredList(persons);
  }, [persons]);

  // newName component rerenders and reflects any changes made to the input field
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  // newNumber component rerenders and reflects any changes made to the input field
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const contactsToShow = showAll
    ? persons
    : persons.filter(person => person.important)

  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled')
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
     <Filter 
      persons={persons}
      setFilteredList={setFilteredList}
      setFilterText={setFilterText}
      value={filterText}/>

      <h2>add a new</h2>
      <PersonForm 
      persons={persons}
      newName={newName}
      newNumber={newNumber}
      setNewName={setNewName}
      setNewNumber={setNewNumber}
      setPersons={setPersons}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Contacts
      filteredList={filteredList}
      newName={newName}
      newNumber={newNumber}/>
    </div>
  )
}

export default App