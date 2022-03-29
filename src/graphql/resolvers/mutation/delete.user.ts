

import { Request } from 'express'
import {Users} from '../../../mongo'


export const deleteUser = async({_id}: { _id : string}, req: Request)=> {
	try{
		const candidate = await Users.findById(_id)
		if (!candidate){
			throw new Error('Users not found.')
		}
		if (candidate){
			await Users.deleteOne({ _id : _id})
			return true
		}
		throw new Error('Haven\'t permission')
	}catch(e){
		console.log(e)
		return new Error(e as string)
	}
}