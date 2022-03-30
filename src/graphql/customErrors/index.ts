import { GraphQLError } from "graphql";



const AlreadyExistsError  = new Error('Record already exists!')
const NotFoundError = new Error('Record not found!')
const BadCredentialsErrror = new Error('Credentials is not valid!')
const UnAuthorisedError = new Error('Permission denied.')
const BadRBAType = new Error('Haven\'t permission to resolve this operation.')

export {
	AlreadyExistsError,
	NotFoundError,
	BadCredentialsErrror,
	UnAuthorisedError,
	BadRBAType
}