export const checkUser = (req, res, next) =>{
    const {userId} = req.query
    if (userId) {
        next()
    }
    res.status(401).send({message: "No user ID found"})
}