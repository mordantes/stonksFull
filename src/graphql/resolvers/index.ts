import { addProduct } from './mutation/add.product'
import { changeRole } from './mutation/change.role'
import { deleteUser } from './mutation/delete.user'
import { signIn } from './mutation/signIn'
import {signUp}  from './mutation/signUp'
import { getCategories } from './query/getCategories'
import { getProductById } from './query/getProductById'
import { getProductsByName } from './query/getProductsByName'
import { getRoles } from './query/getRoles'
import { getUserById } from './query/getUserById'
import { getUsers } from './query/getUsers'


export const resolvers = {
	//mutations
	signUp: signUp,
	signIn : signIn,
	addProduct : addProduct,
	deleteUser: deleteUser,
	changeRole: changeRole,
	//queries
	getProductsByName: getProductsByName,
	getProductById : getProductById,
	getCategories: getCategories,
	getUsers: getUsers,
	getUserById: getUserById,
	getRoles: getRoles,
}