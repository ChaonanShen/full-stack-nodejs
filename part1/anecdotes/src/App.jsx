import { useState } from 'react'

const Vote = ({ text, value }) => {
  return <div>
    <p>{text}</p>
    <p>has {value} votes</p>
  </div>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [maxIdx, setMaxIdx] = useState(0)
  const [votes, setVotes] = useState([...Array(anecdotes.length)].map(() => 0))

  const randomInt = () => Math.floor(Math.random() * anecdotes.length)

  const handleVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
    setMaxIdx(votesCopy[selected] > votesCopy[maxIdx] ? selected : maxIdx)
  }

  const handleNext = () => {
    setSelected(randomInt())
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Vote text={anecdotes[selected]} value={votes[selected]} />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Vote text={anecdotes[maxIdx]} value={votes[maxIdx]} />
    </div>
  )
}

export default App