
import {verify} from 'jsonwebtoken'
import { JWTPayloadObj } from './types';

export const getToken = async(token: string) => {
    if (token) {
        try {
            const bearerToken = token.split(" ");
            // console.log(bearerToken, 'token')
            // return the user information from the token
            const ver = verify(bearerToken[1], process.env.SECRET as string, { ignoreExpiration : false}) as  JWTPayloadObj      
            return ver
		} catch (err) {
            // if there's a problem with the token, throw an error
            throw new Error('Session invalid');
        }
    }
};