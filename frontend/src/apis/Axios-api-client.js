import axios  from "axios"
import useAthStore from "../store/UserAuthStore"

const url='https://personal-tracker-api-z0z2.onrender.com'
const Api_url=axios.create({
    baseURL:url,
    headers:{
        "Content-Type":"application/json"
    }
})

// intercerters
Api_url.interceptors.request.use((config)=>{
    const {token}=useAthStore.getState()
    if(token){
        config.headers.Authorization=`Bearer ${token}`
        
    }

    return config
})

export default Api_url;