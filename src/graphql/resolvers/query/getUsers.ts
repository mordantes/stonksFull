import { Request } from "express"
import { BadRBAType } from "../../customErrors"
import { ContextFn } from "src/utils/types"
import { Users } from "../../../mongo"
import { GQLResolver } from "../types"

export const getUsers : GQLResolver= async(params: any, context: ContextFn, req : Request) => {
	try{
		return await Users.find()
	}catch(e){
		throw new Error(e as string)
	}
}