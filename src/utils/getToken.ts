
import {verify} from 'jsonwebtoken'

export const getToken = async(token: string) => {
    if (token) {
        try {
            const bearerToken = token.split(" ");
            console.log(bearerToken, 'token')
            // return the user information from the token
            return await verify(bearerToken[1], process.env.JWT_SECRET as string, { ignoreExpiration : false});        
		} catch (err) {
            // if there's a problem with the token, throw an error
            throw new Error('Session invalid');
        }
    }
};