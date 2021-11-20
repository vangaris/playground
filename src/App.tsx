import {useState} from 'react'
import AppBar from '../src/components/AppBar'
import Users from './components/Users'
import SignIn from './components/SignIn'

function App() {
  const [loggedIn, setLoggedIng] = useState(false)
  return (
    <div className="App">
      {loggedIn ? (
        <>
          <AppBar />
          <Users />
        </>
      ) : (
        <SignIn setAuthUser={setLoggedIng} />
      )}
    </div>
  )
}

export default App
