import { Request } from "express"
import {  Roles, Users } from "../../../mongo"



export const getUsers = async(params: any, context: any, req : Request) => {
	try{
		const { error } = await context()
		if (error) throw error
		return await Users.find()
	}catch(e){
		return new Error(e as string)
	}
}