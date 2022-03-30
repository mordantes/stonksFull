
import { Request } from 'express'
import { BadCredentialsErrror, NotFoundError } from '../../customErrors'
import { Role } from '../../../mongo/models/role'
import {Users, Products} from '../../../mongo'


export const changeRole = async({newRole, userId}: { newRole : keyof typeof Role, userId : string}, req: Request)=> {
	try{
		if (!Role[newRole]){
			return BadCredentialsErrror
		}
		const isExists =  await Users.findById(userId) 
		if (isExists && isExists.role === 'ADMIN'){
			await Users.updateOne(isExists, {role: newRole})
			return await Users.findById(userId) 
		}
		return NotFoundError
	}catch(e){
		console.log(e)
		return new Error(e as string)
	}
}