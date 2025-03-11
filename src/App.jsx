import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
          style={{backgroundImage:`url("https://www.econlib.org/wp-content/uploads/2018/02/foreign-exchange.jpg")`}}>
          hello
      </div>
    </>
  )
}

export default App
