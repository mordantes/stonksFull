import { Request } from "express"
import {  Roles } from "../../../mongo"



export const getRoles = async(root : any, req : Request) => {
	try{
		return await Roles.find()
	}catch(e){
		return new Error(e as string)
	}
}