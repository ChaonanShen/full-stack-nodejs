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

app.post('/api/persons', (req, rsp) => {
    // 不能只是判断字段是否确实，还有字段是否为''
    if (!req.body.name || !req.body.number) {
        return rsp.status(400).json({ error: 'name or number missing' })
    }

    if (phonebooks.some(p => p.name === req.body.name)) {
        return rsp.status(400).json({ error: 'name must be unique' })
    }

    const id = String(Math.floor(Math.random() * 1000000))

    const newPerson = {
        "id": id,
        "name": req.body.name,
        "number": req.body.number,
    }

    // 不用担心并发问题，nodejs 主线程按事件循环顺序执行
    phonebooks.push(newPerson)

    rsp.json(newPerson)
})

app.delete('/api/persons/:id', (req, rsp) => {
    const id = req.params.id
    phonebooks = phonebooks.filter(p => p.id !== id)
    // 无论是否存在该 phonebook 都返回 204
    rsp.status(204).end()
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