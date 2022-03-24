import { gql } from 'apollo-server-express';


export const typeDefs = gql`
    type Product{
		_id: Int,
		goodName: String,
		offer: Int,
		actual: Boolean,
		shopName: String,
		link: String,
		category: String,
		prices: [Prices],
        sub: Float
    }

    type Prices{
        date:String
        price:Int
    }
    type Category{
        _id: String,
        totalValueChanges: Int
        totalCountChanges: Int
        totalStartValue: Int
        totalEndValue: Int
        totalProducts: Int
    }

    type User {
        _id : String
        name : String
        password : String
        role : String # ADMIN or USER or GUEST
        email : String
        products: [Int]
    }

    input NewUser{
        name : String
        password : String
        email : String
    }
    type NewUserPayload{
        user: User
    }
    type DeleteUserPayload{
        id: ID
        deleted: Boolean
    }
    input ChangeNameInput{
        id : ID
        newName : String
    }
    type ChangeNamePayload{
        newName : String
        changed: Boolean
    }

    input ChangePwdInput{
        id : ID
        password : String
    }
    type ChangePwdPayload{
        changed: Boolean
    }
    input DeleteUser{
        id: ID
    }
    input ChangeRoleInput{
        id: ID
        newRole : String# "ADMIN" or "USER" or "GUEST"
    }
    input AddProductInput{
        id: ID
        productId : Int
    }

    type Query{
        getProductsByName(term:String):[Product]
        findProduct(id:ID):Product
        getCategories: [Category]
        getUsers : [User]
        getUserById(userId: ID): User
    }
    type Mutation{
        createUser(input:NewUser!): User
        deleteUser(input: DeleteUser): DeleteUserPayload
        changePassword(input: ChangePwdInput) : ChangePwdPayload
        changeName(input: ChangeNameInput) : User
        changeRole(input : ChangeRoleInput) : User
        addProduct(input: AddProductInput): User
    }

`;