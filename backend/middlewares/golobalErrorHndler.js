export const globalErr=(err, req, res, next)=>{
    const status= err.statusCode || 500;

    res.status(status).json({
        success:false, 
        status,
        message:err.message || 'something went wrong'
    })
}