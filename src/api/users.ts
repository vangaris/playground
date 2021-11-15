import axios from 'axios'

// type typeParams = {
//   params: {
//     email:string,
//     name:string,
//     password:string,
//     phone: string
//   }
// }



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


const fetchUsers = () => {
  return axios.request<userType[]>({
    method: 'GET',
    url: `http://localhost:3000/users`,
    headers: {
      'Content-type': 'application/json',
    },
  })
}

export {fetchUsers}
