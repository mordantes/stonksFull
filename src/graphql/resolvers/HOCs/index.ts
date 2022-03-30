import { ContextFn } from "../../../utils/types"
import { GQLResolver } from "../types"
import { Request } from "express"
import { Role } from "../../../mongo/models/user"
import { BadRBAType } from "../../customErrors"
import { getUsers } from "../query/getUsers"
import { signIn } from "../mutation/signIn"
import { getUserById } from "../query/getUserById"
import { getRoles } from "../query/getRoles"
import { addProduct } from "../mutation/add.product"
import { deleteUser } from "../mutation/delete.user"
import { changeRole } from "../mutation/change.role"
import { getProductsByName } from "../query/getProductsByName"
import { getProductById } from "../query/getProductById"
import { getCategories } from "../query/getCategories"


const checkAuth = (resolverFn : GQLResolver) => {
	return async(params: any, context: ContextFn, req : Request) => {
		try{
			const { error, token } = await context(req)
			if (error)  throw error
			return resolverFn(params,context,req)
		}catch(e){
			throw new Error(e as string)
		}
	}
}

const checkAdmin = (resolverFn : GQLResolver) => {
	return async(params: any, context: ContextFn, req : Request) => {
		try{
			const { token } = await context(req)
			if( token?.role === "ADMIN"){
				return resolverFn(params,context,req)
			}
			throw BadRBAType
		}catch(e){
			throw new Error(e as string)
		}
	}
}

function asyncPipe(...fns: Function[] ) {
    return (x: any) => fns.reduce((y, fn) => {
        return y instanceof Promise ? y.then(yr => fn(yr)) : fn(y)
    }, x)
}


const withAdminGetUsers = asyncPipe(checkAuth, checkAdmin)(getUsers)
const withAdminGetUserById = asyncPipe(checkAuth, checkAdmin)(getUserById)
const withAdminGetRoles = asyncPipe(checkAuth, checkAdmin)(getRoles)
const withAuthAddProduct = checkAuth(addProduct)
const withAdminDeleteUser = asyncPipe(checkAuth, checkAdmin)(deleteUser)
const withADminChangeRole = asyncPipe(checkAuth, checkAdmin)(changeRole)
const withAuthGetProductsByName = checkAuth(getProductsByName)
const withAuthGetProductById = checkAuth(getProductById)
const withAuthGetCategories = checkAuth(getCategories)

export {
	withAdminGetUsers,
	withAdminGetUserById,
	withAdminGetRoles,
	withAuthAddProduct,
	withAdminDeleteUser,
	withADminChangeRole,
	withAuthGetProductsByName,
	withAuthGetProductById,
	withAuthGetCategories,
}