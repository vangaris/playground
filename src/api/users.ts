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

type loginType  = {
  email:  any,
  password:  any
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

const login = async ({email, password} : loginType) => {
  const data = {email, password}
  const response = await axios.request<any>({
    method: 'post',
    url: `http://localhost:3000/users/login`,
    headers: {
      'Content-type': 'application/json',
    },
    data
  })
  
  return response.data
}

export {fetchUsers, login}
