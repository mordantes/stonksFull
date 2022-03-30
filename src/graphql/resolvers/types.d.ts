import { Request } from "express"

export interface SignCredentials {
	input:{
		email : string
		password : string
	}
}


type GQLResolver = (gqParams: any, context: ContextFn, req : Request)=> Promise<any[] | any>