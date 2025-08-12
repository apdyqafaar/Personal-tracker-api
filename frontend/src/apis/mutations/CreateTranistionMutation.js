import { useMutation, useQueryClient} from "@tanstack/react-query"
import Api_url from "../Axios-api-client"


export const CreateTransMutation=()=>{
    const queryClient= useQueryClient()
    return useMutation({
        mutationFn:async(transData)=>{
            const response=await Api_url.post("/trans", transData)
            return response
        },
          onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllTrans"] });
    },
    })
}