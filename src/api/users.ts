import axios from 'axios'
import {userType} from "./types/user"

const fetchUsers = async () => {
  const response = await axios.request<userType[]>({
    method: 'GET',
    url: `http://localhost:3000/users`,
    headers: {
      'Content-type': 'application/json',
    },
  })

  return response.data
}

export {fetchUsers}
