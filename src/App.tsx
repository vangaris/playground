import {useEffect, useState} from 'react'
import './App.css'
import AppBar from '../src/components/AppBar'
import BottomNavigation from '../src/components/BottomNavigation'
import {fetchUsers} from '../src/api/users'

type usersType = {
  data: Array<userType>
}

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
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const {data}: any = await fetchUsers()
    setUsers(data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="App">
      <AppBar />
      {users.map((u: userType) => (
        <h2>{u.phone}</h2>
      ))}
      <BottomNavigation />
    </div>
  )
}

export default App
