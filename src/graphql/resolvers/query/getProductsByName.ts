import { Request } from "express"
import { Products } from "../../../mongo"
import { productsWithFilter } from "../pipes/products"

interface Input {
	term: string
}

export const getProductsByName = async({ term } : Input, req : Request) => {
	try{
		return await Products.aggregate(productsWithFilter(term))
	}catch(e){
		return new Error(e as string)
	}
}