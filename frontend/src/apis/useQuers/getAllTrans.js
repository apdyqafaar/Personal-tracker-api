import { useQuery} from "@tanstack/react-query"
import Api_url from "../Axios-api-client"

export const getAllTrans=()=>{
    return useQuery({
        queryKey:["getAllTrans"],
        queryFn:async()=>{
            const response=await Api_url.get("/trans", )
            return response
        }
    })
}