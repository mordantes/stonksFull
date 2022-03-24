
import { Products, Users } from '../mongo';
import { AlreadyExistsError, BadValueErrror, NotFoundError, NotValidError } from './customErrors';
import { categories } from './query/categories';
import {  productsWithFilter } from './query/products';
import {Role} from '../mongo/models/user'

export const resolvers = {
	Query: {
		getProductsByName:(root: any, {term} : Term)=>{
			 return new Promise((resolve,reject)=>{
                    Products.aggregate(productsWithFilter(term),(err: any,product:any)=>{
                        if(err) reject(err);
                        else resolve(product);
                    })
            })
		},
		findProduct:(root : any,{id} : InputId<number>)=>{
                return new Promise((resolve,reject)=>{
                    Products.findOne({_id:id},(err : any,product: any)=>{
                    if(err) reject(err);
                    else resolve(product);
                })
			})
		},
        getCategories:(root: any)=>{
			 return new Promise((resolve,reject)=>{
                    Products.aggregate(categories,(err: any,product:any)=>{
                        if(err) reject(err);
                        else resolve(product);
                    })
            })
		},
        getUsers:(root: any) => {
             return new Promise((resolve,reject)=>{
                    Users.find((err: any,users:any)=>{
                        if(err) reject(err);
                        else resolve(users);
                    })
            })
        },
        getUserById:(root: any, {id} : InputId<string>) => {
             return new Promise((resolve,reject)=>{
                    Users.find({
                        _id : id
                    },(err: any,user:any)=>{
                        if(err) reject(err);
                        else resolve(user);
                    })
            })
        },   
	},
    Mutation: {
        createUser: async(root: any, { input } : {input : Candidate}) => {
            const isExists =  await Users.find({ name : input.name, email : input.email}) 
            if (!isExists.length){
                const newUser = new Users(input)
                await Users.bulkWrite([{ insertOne : { "document" : newUser } }])
                const createdUser = await Users.findById(newUser._id) 
                return createdUser
            }
            return AlreadyExistsError
        },
        deleteUser:async(root: any, { input } : {input : InputId<string>} )=>{
            const isExists =  await Users.findById(input.id) 
            if (isExists){
               await Users.deleteOne({ where: { _id : input.id}})
               return { id : input.id, deleted: true}
            }
            return NotFoundError
        },
        changePassword:async(root: any, { input } : {input : ChangePwd<string>} )=>{
            const isExists =  await Users.findById(input.id) 
            if (isExists){
               await Users.updateOne(isExists, {password: input.password})
               return { id : input.id, changed: true}
            }
            return NotFoundError
        },
        changeName:async(root: any, { input } : {input : ChangeName<string>} )=>{
            const isExists =  await Users.findById(input.id) 
            if (isExists){
               await Users.updateOne(isExists, {name: input.newName})
               return await Users.findById(input.id) 
            }
            return isExists
        },
        changeRole:async(root: any, { input } : {input : ChangeRole<string>} )=>{
            if (!Role[input.newRole]){
                return BadValueErrror
            }
            const isExists =  await Users.findById(input.id) 
            if (isExists){
               await Users.updateOne(isExists, {role: input.newRole})
               return await Users.findById(input.id) 
            }
            return NotFoundError
        },
        addProduct:async(root: any, { input } : {input : AddProduct<string>} )=>{
            const isExists =  await Users.findById(input.id) 
            const newProduct = await Products.findById(input.productId)
            if (isExists && newProduct && isExists.products.length < 10){
               const currProducts : number[]  = isExists.products ? isExists.products : []
               await Users.updateOne(isExists, {$push : {
                    products:newProduct._id
               }})
               const newOne = await Users.findById(input.id) 
               console.log(newOne, currProducts)
               return newOne
            }
            return BadValueErrror
        },
    }
} 



interface InputId<T extends string | number>{
    id : T
}
interface Candidate {
    name : string
    password : string
    email : string
}
interface ChangeName<T> extends InputId<T extends number ? T : never> {
    newName : string
}
interface ChangePwd<T> extends InputId<T extends number ? T : never> {
    password : string
}
interface ChangeRole<T> extends InputId<T extends number ? T : never> {
    newRole : keyof typeof Role
}
interface AddProduct <T> extends InputId<T extends string ? T : never>{
    productId: number
}
interface Term {
    term: string
}