import { Request } from "express"
import {  Roles, Users } from "../../../mongo"



export const getUserById = async({userId} : {userId: string}, req : Request) => {
	try{
		return await Users.findById(userId)
	}catch(e){
		return new Error(e as string)
	}
}