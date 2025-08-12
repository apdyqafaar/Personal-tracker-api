import {useMutation, useQueryClient} from "@tanstack/react-query"
import Api_url from "../Axios-api-client"


export const DeleteMutation=()=>{
    const queryClient= useQueryClient()
    
    return useMutation({
        mutationFn:async(id)=>{
            const response=await Api_url.delete(`/trans/${id}`, )
            return response
        }
        ,
          onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllTrans"] });
    }
    })
}