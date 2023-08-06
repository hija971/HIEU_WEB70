import jwt from "jsonwebtoken"

const SECRET_KEY =  "132^&@454#$^654#%8545?/"

export const generateToken = (data) => {
    const token = jwt.sign(data, SECRET_KEY, {
        expiresIn: 500
    })
    return token
}

export const verifyToken = (token) => {
    const getDecode = jwt.verify(token, SECRET_KEY)
    return getDecode
}