
import jwt from "jsonwebtoken";

const DEFAULT_EXPIRES_IN = {
    expiresIn: "30d"
}

export function signJwtAccessToken(payload, options = DEFAULT_EXPIRES_IN) {
    const secret_key = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secret_key, options);
    return token;
}


export function verifyJwt(token) {
    try {

        const secret_key = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secret_key);
        return decoded;

    } catch (error) {
        return null;

    }
}
