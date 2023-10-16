import jwt from "jsonwebtoken";

export const generateJWT = (payload: {[key: string]: string | number | boolean}, lifetime: string | number) => {
    return jwt.sign(payload, process.env.SECRET_KEY || '', {expiresIn: lifetime})
}