import { useQuery } from "@tanstack/react-query"
import useAthStore from "../../store/UserAuthStore"
import Api_url from "../../apis/Axios-api-client"
import { useEffect } from "react"
import { Navigate, useLocation } from "react-router"
import { LoaderCircle } from "lucide-react"


export const ProtectedRoutes=({children})=>{
     
     const {token, clearAuth, setAuth, user}=useAthStore()
     const location=useLocation()


     const {isLoading, isError, error, data, isSuccess}=useQuery({
        queryKey:['auth'],
        queryFn:async()=>{
            const response=await Api_url.get('/');
            return response
        },
        retry:2
     })



     useEffect(()=>{
        if(isError) clearAuth()
     },[isError, error,clearAuth])



     useEffect(()=>{
       if(isSuccess, data) setAuth(data.data, token)
     },[isSuccess, data, setAuth])




     if(isError || error) return <Navigate to={'/login'} replace state={{from:location}}/>
     if(!user) return <Navigate to={'/login'} replace state={{from:location}}/>


     if(isLoading){
        return <div className="flex items-center justify-center min-h-screen w-full">
             <LoaderCircle className="h-8 w-8 animate-spin text-primary"/>
        </div>
     }



     return children
}