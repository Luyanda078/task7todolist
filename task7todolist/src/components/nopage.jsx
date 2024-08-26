import React from 'react'
import ErrorPage from '../assets/ErrorPage.png'

function Nopage() {
  return (
    <div>
      <h1>Sorry this is not found</h1>
      <img src={ErrorPage} alt="My Error Image" />
    </div>
  )
}
export default Nopage