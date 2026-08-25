import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAllPersons = () => axios.get(url).then(response => response.data)

const createPerson = (person) => axios.post(url, person).then(response => response.data)

const updatePerson = (id, person) => axios.put(`${url}/${id}`, person).then(response => response.data)

export default { getAllPersons, createPerson, updatePerson }