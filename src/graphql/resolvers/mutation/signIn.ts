
import { Request } from 'express'
import { compareSync, hashSync } from 'bcrypt'
import {Users} from '../../../mongo'
import {sign} from 'jsonwebtoken'
import { SignCredentials } from '../types'
import { BadCredentialsErrror, NotFoundError } from '../../customErrors'


export const signIn = async({input}: SignCredentials, req: Request)=> {
	try{
		const {email ,password} = input
		const user = await Users.findOne({ email }) 
		if (!user){
			throw NotFoundError
		}
		const compare = compareSync(password, user.password)
		if (!compare){
			throw BadCredentialsErrror
		}
		return sign({ id: user._id , role: user.role, email: user.email}, process.env.SECRET as string, { expiresIn : '2 days'});
	
	}catch(e){
		throw new Error(e as string)
	}
}