import axios from 'axios'
import {loginType} from "./types/auth"

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

export {login}