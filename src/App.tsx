import AppBar from '../src/components/AppBar'
import Users from './components/Users'
import SignIn from './components/SignIn'
import {useAuth} from '../src/context/auth-context'

function App() {
  const {user} = useAuth()

  return (
    <>
      {user ? (
        <>
          <AppBar />
          <Users />
        </>
      ) : (
        <SignIn />
      )}
    </>
  )
}

export default App
