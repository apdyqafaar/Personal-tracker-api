import {useMutation, useQueryClient} from "@tanstack/react-query"
import Api_url from "../Axios-api-client"


export const UpdateTranisMutation=()=>{
    const queryClient= useQueryClient()
    
    return useMutation({
        mutationFn:async(transData)=>{
            const response=await Api_url.put(`/trans/${transData.id}`, transData)
            return response
        }
        ,
          onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllTrans"] });
    }
    })
}