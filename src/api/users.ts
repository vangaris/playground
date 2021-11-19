import axios from 'axios'

type userType = {
    age: number,
    _id: string,
    email: string,
    name: string,
    phone: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}


const fetchUsers =async () => {
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
