import useAthStore from "../../store/UserAuthStore"
import { Navigate, useLocation } from "react-router"


export const UnprotectedRoutes=({children})=>{
     
     const {token, user}=useAthStore()
     const location=useLocation()



     if(token || user) return <Navigate to={'/'} replace state={{from:location}}/>



     return children
}