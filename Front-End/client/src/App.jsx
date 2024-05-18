import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import ComponentRoutes from './Components/LandingComponent/Routes/ComponentRoutes'

function App() {

  return (
    <>
      <Router>
      <ComponentRoutes />
      </Router>
    </>
  )
}

export default App
