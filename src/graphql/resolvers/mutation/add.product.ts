
import { Request } from 'express'
import { BadCredentialsErrror } from '../../customErrors'
import {Users, Products} from '../../../mongo'


export const addProduct = async({productId, userId}: { productId : number, userId : string}, req: Request)=> {
	try{
		const isExists =  await Users.findById(userId) 
		const newProduct = await Products.findById(productId)
		if (isExists && newProduct && isExists.products.length < 15){
			const currProducts : number[]  = isExists.products ? isExists.products : []
			await Users.updateOne(isExists, {$push : {
				products:newProduct._id
			}})
			const newOne = await Users.findById(userId) 
			return newOne
		}
		return BadCredentialsErrror
	}catch(e){
		console.log(e)
		return new Error(e as string)
	}
}