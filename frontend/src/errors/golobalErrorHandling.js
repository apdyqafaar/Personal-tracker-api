export const ExtractErrorMessage=(err)=>{
 
    if(!err) return
   
    if(err.response?.data){
        const data=err.response.data
 
        if(data.errors && Array.isArray( data.errors)){
         return data.errors.slice(1).map(e=> e.message).join(',')
        }

        if(data.message){
            return data.message
        }


        if(data.error){
            return data.error
        }
    }




    // handle network errors
    if(!err.response) return "Network Error , Please check your connection"



    // gemaral err
    if(err.message) return err.message


    return 'Something went wrong. please try again'

}