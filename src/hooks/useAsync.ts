 import { useQuery } from 'react-query'
import {fetchUsers} from "../api/users"


const useAsync = () => {
    const {data} = useQuery("Users", fetchUsers);
    return {data}

}

export default useAsync
