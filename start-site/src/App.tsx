import { useState } from "react"
import './App.css'
import MyForm from "./componets/MyForm/MyForm"

function App() {

  const[isClick, setIsClick] = useState(false)

  return (
    <>
      <header className="header">
        <h1>Web analytics</h1>
      </header>
      
      <main className="main">
        {
        isClick 
          ? 
          <MyForm /> 
          : 
          <button className="startButton" onClick={() => setIsClick(true)}>НАЧАТЬ</button>
        }
      </main>

      <footer className="footer">
        <div>
          <h2>created for web analytics course</h2>
        </div>
      </footer>
    </>
  )
}

export default App
