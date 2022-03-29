import { getToken } from "./getToken";
import { Request }  from 'express'


export const getContext = async(req : any) => {
	try{
		const token = req.headers.authorization;
		if (!token){
			return { error : 'Permission denied.'}
		}  
		const verify = await getToken(token)
		return { token : verify}
	}catch(e){
		return { error : e as string}
	}
}