import { useMutation } from "@tanstack/react-query";
import useAthStore from "../../store/UserAuthStore";
import Api_url from "../Axios-api-client";


 const {setAuth, clearAuth}=useAthStore.getState()


 export const useLoginMuta=()=>{

    return useMutation({
        mutationFn:async(userData)=>{
            // console.log(userData)
            const response=await Api_url.post("/auth/login", userData);
            return response.data
        },

        onError:(e)=>{
            clearAuth()
        },
        onSuccess:({logedUser, token})=>{
           setAuth(logedUser, token)
        }
    })
 }