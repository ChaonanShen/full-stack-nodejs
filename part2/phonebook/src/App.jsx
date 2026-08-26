import { useState, useEffect } from 'react'
import personServices from './services/persons.js'

const filterOut = (persons, filterWord) => {
  const filtered = []
  for (const person of persons) {
    if (person.name.toLowerCase().includes(filterWord.toLowerCase())) {
      filtered.push(person)
    }
  }
  return filtered;
}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with<input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({ addInfo, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <div>
      <form onSubmit={addInfo}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Person = ({ person, persons, setPersons }) => {
  const onDeletePerson = () => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }
    personServices
      .deletePerson(person.id)
      .then(() => setPersons(persons.filter(p => p.id !== person.id)))
      .catch(() => { alert(`${person.name} was already deleted from the server`) })

  }
  return (
    <div>
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={onDeletePerson}>remove</button>
      </p>
    </div>
  )
}

const Persons = ({ filteredPersons, allPersons, setPersons }) => {
  return (
    <div>
      {filteredPersons.map((person) => <Person key={person.id} person={person} persons={allPersons} setPersons={setPersons} />)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => setNewFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  // 上来读取所有persons 数据
  useEffect(() => {
    personServices.getAllPersons().then(returnedPersons => {
      setPersons(returnedPersons)
    })
  }, [])

  const addInfo = (event) => {
    event.preventDefault()
    for (const person of persons) {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`)
        return
      }
    }

    const newPerson = { name: newName, number: newNumber }
    personServices.createPerson(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const filteredPersons = filterOut(persons, newFilter)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addInfo={addInfo} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} allPersons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App