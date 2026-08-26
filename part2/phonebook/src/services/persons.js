import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAllPersons = () => axios.get(url).then(response => response.data)

const createPerson = (person) => axios.post(url, person).then(response => response.data)

// TODO: 错误处理放到组件里吧，怎么确认 error 是 404？
const updatePerson = (id, person) => axios.put(`${url}/${id}`, person).then(response => response.data).catch(() => {alert(`resource ${id} already deleted`)})

const deletePerson = (id) => axios.delete(`${url}/${id}`)

export default { getAllPersons, createPerson, updatePerson, deletePerson }