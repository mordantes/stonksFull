import { withADminChangeRole,
	withAdminDeleteUser,
	withAdminGetRoles, 
	withAdminGetUserById,
	withAdminGetUsers, 
	withAuthAddProduct,
	withAuthGetCategories, 
	withAuthGetProductById, 
	withAuthGetProductsByName } from './HOCs'
import { signIn } from './mutation/signIn'
import {signUp}  from './mutation/signUp'



export const resolvers = {
	//mutations
	signUp: signUp,
	signIn : signIn,
	addProduct : withAuthAddProduct,
	deleteUser: withAdminDeleteUser,
	changeRole: withADminChangeRole,
	//queries
	getUsers: withAdminGetUsers,
	getProductsByName: withAuthGetProductsByName,
	getProductById : withAuthGetProductById,
	getCategories: withAuthGetCategories,
	getUserById: withAdminGetUserById,
	getRoles: withAdminGetRoles,
}