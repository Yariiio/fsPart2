import React from "react";

const Filter = ({handleFilteredName, filteredName}) => (
    <div>
      <p>filter people by name<input type='text' onChange={handleFilteredName} value={filteredName}/></p>
    </div>
  )

  const PersonForm = ({handleName, handleNumber, newNumber, newName, addPerson}) => (
    <form onSubmit={addPerson}>
        <div>
          name: <input 
          onChange={handleName} value={newName}/>
          <br />
          number: <input type='text' onChange={handleNumber} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
  
  const Persons = ({persons, filteredName, handleDelete}) => {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().startsWith(filteredName.toLowerCase()))
  
    return (
    <div>
      {filteredName ? filteredPersons.map(person => 
      <Person 
        key={person.name} 
        name={person.name} 
        number={person.number} 
        id={person.id}
        handleDelete={handleDelete} 
      />) :
      persons.map(person => 
      <Person
        key={person.name} 
        name={person.name} 
        number={person.number}
        id={person.id}
        handleDelete={handleDelete}
       />)}
    </div>)
  } 
    
  
  
  const Person = ({name, number, id, handleDelete}) => (
    <div>
      <h4>{name} {number} <button onClick={() => handleDelete(id, name)}>delete</button></h4>
    </div>
  )  

export {PersonForm, Persons, Filter}  