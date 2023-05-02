import React from 'react'
import "./TestDate.css"
const TestDate = () => {

  return (
    <>
    <div className="expense-date">
      <div> {new Date().toLocaleTimeString()} </div>
    </div>




    </>
  
  )
}

export default TestDate