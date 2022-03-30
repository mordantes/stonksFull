import { getToken } from "./getToken";
import { ContextFn } from "./types";
import { UnAuthorisedError } from "../graphql/customErrors/index";


export const getContext: ContextFn = async(req) => {
	try{
		const token = req.headers.authorization;
		if (!token){
			throw UnAuthorisedError
		}  
		const verify = await getToken(token)
		return { token : verify}
	}catch(e){
		return { error : e as string}
	}
}