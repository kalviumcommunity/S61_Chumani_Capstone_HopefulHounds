import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DonationProvider } from './Components/LandingComponent/DonateComponent/DonationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <DonationProvider>
    <App />
  </DonationProvider>,
)
