export const validator=(schema)=>(req, res, next)=>{

    const result=schema.safeParse(req.body)

    if(!result.success){
        const formaterErrors=result.error.format()

        res.status(400).json({
            success:false,
            status:400,
            message:"validation failed",
            errors: Object.keys(formaterErrors).map(field=>({
                field,
                message:formaterErrors[field]?._errors?.[0] || 'something went wrong'
            }))
        })
    }


    next()
}