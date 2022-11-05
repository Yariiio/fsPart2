import { useState, useEffect } from 'react'
import {getAll, update, removePerson, addNew} from './services/persons'
import {SuccessMessage, ErrorMessage} from './components/messages'
import {Persons, Filter, PersonForm} from './components/appComponents'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
 
  useEffect(() => {
    getAll()
    .then(personsData => {
      setPersons(personsData)
    })
  }, [])

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilteredName = (event) => {
    setFilteredName(event.target.value)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      removePerson(id)
      .then(() => {
        const newData = persons.filter(person => person.id !== id)
        setPersons(newData)
        setSuccessMessage(`${name} deleted succesfully`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    }
  }  

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
      if (window.confirm(`${newPerson.name} already added to phonebook, replace the old number with a new one?`)) {
        
        const personToUpdate = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
        const updatedPerson = {...personToUpdate, number: newPerson.number}

        update(personToUpdate.id, updatedPerson)
        .then(returnObj => {
          setSuccessMessage(`Succesfully changed ${returnObj.name}'s number`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)

          setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnObj))
          setNewName("")
          setNewNumber("")
        })
        .catch(error => {
          setErrorMessage(`Information of ${updatedPerson.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          const newData = persons.filter(person => person.id !== updatedPerson.id)
          setPersons(newData)
        })
      }
    }  
    else {
      addNew(newPerson)
      .then(returnObj => {
        setPersons(persons.concat(returnObj))
        setSuccessMessage(`Added ${newPerson.name}`)

        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)

        setNewName("")
        setNewNumber("")
      })
    }
 }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMessage message={successMessage}/>
      <ErrorMessage message={errorMessage}/>
      <Filter 
        handleFilteredName={handleFilteredName} 
        filteredName={filteredName}
      />
      <h2>add a new</h2>
      <PersonForm 
        handleName={handleName} 
        handleNumber={handleNumber} 
        newName={newName} 
        newNumber={newNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filteredName={filteredName}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
