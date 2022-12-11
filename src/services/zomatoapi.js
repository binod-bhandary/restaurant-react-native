import axios from "axios"

const api = axios.create({
    // baseURL: 'https://www.themealdb.com/api/json/v1/1/' 
    baseURL: 'https://developers.zomato.com/api/v2.1/' ,
    headers: { "user-key": "3a6c2efacf6913e8a031149664ed0e0d" }
})

export default api