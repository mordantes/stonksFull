
import { Request } from 'express'
import { compareSync, hashSync } from 'bcrypt'
import {Users} from '../../../mongo'
import {sign} from 'jsonwebtoken'
import { SignCredentials } from '../types'


export const signIn = async({input}: SignCredentials, req: Request)=> {
	try{
		const {email ,password} = input
		const user = await Users.findOne({ email }) 
		if (!user){
			return new Error('Not exists!')
		}
		const compare = compareSync(password, user.password)
		if (!compare){
			return new Error('Credentials is not correct!')
		}
		return sign({ id: user._id }, process.env.SECRET as string, { expiresIn : '2 days'});
		
	}catch(e){
		console.log(e)
		throw e
	}
}