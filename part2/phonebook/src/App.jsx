import { useState, useEffect } from 'react'
import personServices from './services/persons.js'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with<input value={value} onChange={onChange} />
    </div>
  )
}

// 只有 persons 结构需要跨组件，newName/newNumber 这些都是 PersonForm 独享
const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

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

const Person = ({ person, onDeletePerson }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
        <button onClick={() => onDeletePerson(person)}>remove</button>
      </p>
    </div>
  )
}

const Persons = ({ persons, onDeletePerson }) => {
  return (
    <div>
      {persons.map((person) => <Person key={person.id} person={person} onDeletePerson={onDeletePerson} />)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  // 上来读取所有persons 数据
  useEffect(() => {
    personServices.getAllPersons().then(returnedPersons => {
      setPersons(returnedPersons)
    })
  }, [])

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const onDeletePerson = (person) => {
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
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDeletePerson={onDeletePerson} />
    </div>
  )
}

export default App