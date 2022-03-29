import { Request } from "express"
import { Products } from "../../../mongo"


export const getProductById = async({ id } : { id : number}, req : Request) => {
	try{
		 return await Products.findById(id)
	}catch(e){
		return new Error(e as string)
	}
}