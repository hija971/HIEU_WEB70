export const logAPI = (req, res, next) => {
    console.log("API request at", new Date().toLocaleString("vi"))
    next()
};
