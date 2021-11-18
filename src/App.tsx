import {useEffect, useState} from 'react'
import {Box} from '@mui/material'

import AppBar from '../src/components/AppBar'
import BottomNavigation from '../src/components/BottomNavigation'
import SignUp from './components/SignUp'

import {fetchUsers} from '../src/api/users'

type userType = {
  age: number
  _id: string
  email: string
  name: string
  phone: string
  createdAt: string
  updatedAt: string
  __v: number
}

function App() {
  const [users, setUsers] = useState<userType[]>([])

  const getUsers = async () => {
    const {data} = await fetchUsers()
    setUsers(data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="App">
      <AppBar />
      <SignUp />
      {users.map(u => (
        <Box key={u._id}>
          <h2>{u.name}</h2>
          <h2>{u.age}</h2>
          <h2>{u.name}</h2>
          <h2>{u.email}</h2>
          <h2>{u.phone}</h2>
        </Box>
      ))}
      <BottomNavigation />
    </div>
  )
}

export default App
