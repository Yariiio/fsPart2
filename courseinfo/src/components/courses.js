import React from 'react';

const Courses = ({courses}) => {
    return(
      <div>
        {courses.map(course =>
          <div key={course.id}>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
          </div>
          )}
      </div>
    )
  } 
  
  const Header = ({name}) => <h1>{name}</h1>
  
  const Part = ({part}) => <h4>{part.name} {part.exercises}</h4>
   
  const Content = ({parts}) => (
      <div>
        {parts.map(part => (
          <Part key={part.id} part={part}/>
        ))}
      </div>
  )
  
  const Total = ({parts}) => {
    const result = parts.reduce((total, part) => total + part.exercises, 0)
    return <h3>Total of {result} exercises</h3>
  }

export default Courses  