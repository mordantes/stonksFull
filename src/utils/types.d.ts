import { Request } from "express";
import { Role } from "src/mongo/models/user";

interface ContextPayload {
	error?: string
	token?:  undefined | JWTPayloadObj 
}
interface JWTPayloadObj {
	id: string,
	role: keyof typeof Role,
	email: string,
	iat: number,
	exp: number
}
type ContextFn =  (req: Request)=> Promise<ContextPayload>