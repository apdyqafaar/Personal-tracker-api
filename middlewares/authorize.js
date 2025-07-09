
export const athorization=(...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user?.role)) return res.status(401).json('you dont have accees to go admin rote')
     next()
    }

}