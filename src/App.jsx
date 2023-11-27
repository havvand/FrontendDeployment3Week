import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import CarsTable from './components/CarsTable'
import CarsForm from './components/CarsForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CarsTable /> 
    <CarsForm />
    </>
  )
}

export default App
