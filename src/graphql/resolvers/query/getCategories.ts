import { Request } from "express"
import {  Products } from "../../../mongo"
import { categories } from "../pipes/categories"



export const getCategories = async(root: any,  req : Request) => {
	try{
		return await Products.aggregate(categories)
	}catch(e){
		return new Error(e as string)
	}
}