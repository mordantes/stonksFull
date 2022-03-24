import { GraphQLError } from "graphql";



const AlreadyExistsError  = new Error('Record already exists!')
const NotFoundError = new Error('User doesn\'t exists!')
const NotValidError = new Error('New password is not valid!')
const BadValueErrror = new Error('New Role is not valid!')

export {
	AlreadyExistsError,
	NotFoundError,
	NotValidError,
	BadValueErrror
}