import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

// Find the value with the highest votes and return its key
const findMaxKey = (obj) => {
  let maxKey = null
  let maxValue = 0

  for (const key in obj) {
    if (obj[key] > maxValue) {
      maxKey = key;
      maxValue = obj[key]
    }
  }
  return maxKey
  
}

const DisplayAnecdote = ({array, obj, index}) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {array[index]}
      <br></br>
      has {obj[index]} votes
    </div>
  )
  for (const element of array) {
    
  }
}

const DisplayMostVotes = ({array, obj}) => {
    if (Object.keys(obj).length === 0) {
      return (
        <div>
        <h1>Anecdote with the most votes</h1>
        <br></br>
        There are no votes yet.
      </div>
      )
    } else {
      return (
        <div>
          <h1>Anecdote with the most votes</h1>
          {array[findMaxKey(obj)]}
          <br></br>
          has {obj[findMaxKey(obj)]} votes
        </div>
      )
    }
}

const ResetPage = () => {
    window.location.reload()
}

const App = () => {
  // taking a series of anecdotes and storing them
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
  const [numberOfVotes, setVoteCount] = useState({})

  const addVote = () => {
    setVoteCount(prevVoteCount => ({
      ...prevVoteCount,
      [selected]: (prevVoteCount[selected] || 0) + 1
      })
    )
  }

  // randomly access an anecdote
  const randomAnecdote = () => {
    const newSelection = Math.floor(Math.random() * anecdotes.length)
    setSelected(newSelection)
  }

  return (
    <div>
      <DisplayAnecdote array={anecdotes} obj={numberOfVotes} index={selected} /> 
      <br></br>
      <Button handleClick={addVote} text="vote"/>
      <Button handleClick={randomAnecdote} text="next anecdote"/>
      <br></br>
      <DisplayMostVotes array={anecdotes} obj={numberOfVotes} />
      <br></br>
      <Button handleClick={ResetPage} text="reset" />
    </div>
  ) 
  // Need to move the most votes section to different component
  // to allow for the case when there are no votes yet

}

export default App