import {create} from "zustand"
import {persist} from "zustand/middleware"


const useAthStore=create(
    persist(
        (set, get)=>({

           user:null,
           token:null,
           isAuthenticated:false,



        // set auth method
        setAuth:(user, token)=>set({
            user,
            token,
            isAuthenticated:true
        }),

        // clear auth method

        clearAuth:()=>set({
            user:null,
           token:null,
           isAuthenticated:false,
        })

          

        }),
        {
            name:"auth-store",
            partialize:(st)=>({
              user:st.user,  
              token:st.token,  
              isAuthenticated:st.isAuthenticated
            })
        }
    )
    
)



export default useAthStore