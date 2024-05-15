import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import About from './Components/LandingComponent/AboutComponent/About'
import Accessory from './Components/LandingComponent/AccessoryComponent/Accessory'
import Dog from './Components/LandingComponent/DogComponent/Dog'
import ErrorBoundary from './Components/LandingComponent/DogComponent/ErrorBoundary'
import Donate from './Components/LandingComponent/DonateComponent/Donate'
import Home from './Components/LandingComponent/HomeComponent/Home'
import Hospital from './Components/LandingComponent/HospitalComponent/Hospital'
import LandingPage from './Components/LandingComponent/LandingComponent/LandingPage'
import ComponentRoutes from './Components/LandingComponent/Routes/ComponentRoutes'

function App() {

  return (
    <>
      {/* <LandingPage /> */}
      {/* <About /> */}
      {/* <Home /> */}
      {/* <Donate /> */}
      {/* <Accessory /> */}
      {/* <Hospital /> */}
      {/* <ErrorBoundary>
      <Dog />
      </ErrorBoundary> */}
      <Router>
      <ComponentRoutes />
      </Router>
    </>
  )
}

export default App
