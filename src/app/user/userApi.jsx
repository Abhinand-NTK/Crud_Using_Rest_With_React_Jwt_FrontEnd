import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api'

export const userApi = {
    register: async(userData)=>{
        const response = await axios.post(`${BASE_URL}/users/user-register/`,userData);
        console.log(response.data)
        return response.data;
    },
    login: async(userData)=>{
        const response = await axios.post(`${BASE_URL}/users/token/`,userData);
        console.log(response.data)
        return response.data;
    }
}



// export const loginapi = {
// }