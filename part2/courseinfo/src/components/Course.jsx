
const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Part = ({ name, exercises }) => {
    return <p>{name} {exercises}</p>
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(({ name, exercises, id }) => <Part key={id} name={name} exercises={exercises} />)}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
    return (
        <b>
            total of {total} exercises
        </b>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course