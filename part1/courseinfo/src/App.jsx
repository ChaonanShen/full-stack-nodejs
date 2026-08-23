
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return <p>{props.name} {props.exercises}</p>
}

const Content = (props) => {
  const names = props.parts.map((part) => { return part.name });
  const exercises = props.parts.map((part) => { return part.exercises });
  return (
    <div>
      <Part name={names[0]} exercises={exercises[0]} />
      <Part name={names[1]} exercises={exercises[1]} />
      <Part name={names[2]} exercises={exercises[2]} />
    </div>
  )
}

const Total = (props) => {
  let total = props.parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App