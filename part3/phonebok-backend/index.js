const express = require('express')
const app = express()

let phonebooks = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/api/persons', (req, rsp) => {
    rsp.json(phonebooks)
})

app.get('/api/persons/:id', (req, rsp) => {
    const id = req.params.id 
    const person = phonebooks.find(p => p.id === id)
    if (person) {
        rsp.json(person)
    } else {
        rsp.status(404).end()
    }
})

app.get('/info', (req, rsp) => {
    rsp.send(`
        <p>Phonebook has info for ${phonebooks.length} people</p>
        <p>${new Date()}</p>
    `)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})