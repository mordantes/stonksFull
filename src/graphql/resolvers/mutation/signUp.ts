
import { Request } from 'express'
import { hashSync } from 'bcrypt'
import {sign} from 'jsonwebtoken'
import { SignCredentials } from '../types'
import { Users } from '../../../mongo'




export const signUp = async({input}: SignCredentials, req: Request)=> {
	try{
		const { password, email} = input
		const exists = await Users.find({ email : email}) 
		if (exists.length){
			throw new Error('Alreay exists!')
		}
		const hashed = hashSync(password, 12);
		const newUser = new Users({ ...input, password : hashed})
		await Users.bulkWrite([{ insertOne : { "document" : newUser } }])
		return sign({ id: newUser._id}, process.env.SECRET as string, { expiresIn : '2 days'})
	}catch(e){
		console.log(e)
		throw e
	}
}