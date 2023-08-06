export const logAPI = (req, res, next) =>{
    console.log("API requested at", new Date().toLocaleString("vi"))
    next()
}