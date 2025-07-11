import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WelcomeMessage from './components/WelcomeMessage';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import UserProfile from './components/UserProfile';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
          <div>
      <Header />
      <MainContent />
            <UserProfile
        name="Getinet Asimare Nibiret"
        age={33}
        bio="An avid explorer of new places and a passionate photographer. Always ready for the next adventure!"
      />
            <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      <Footer />
  
    </div>

      <div className="App">
            {/* Render the WelcomeMessage component here.
                This is how you use a custom React component within another component's JSX. */}
            <WelcomeMessage />
        </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
