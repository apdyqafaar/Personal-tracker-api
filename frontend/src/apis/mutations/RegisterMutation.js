import {useMutation} from "@tanstack/react-query"
import Api_url from "../Axios-api-client"
import useAthStore from "../../store/UserAuthStore"
 const {setAuth, clearAuth}=useAthStore.getState()



export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await Api_url.post("/auth/register", userData)
      return response.data
    },
    onSuccess:(data)=>{
     setAuth(data.cleanUser, data.token)
 
    },
    onError:()=>{
      clearAuth()
    }
  })
}


export default useRegisterUser
