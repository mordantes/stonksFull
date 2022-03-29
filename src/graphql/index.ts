import { buildSchema } from 'graphql';

export const typeDefs = buildSchema(`
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
    type Role {
        role : String # ADMIN or USER or GUEST
        cartSize : Int!
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
        password : String
        role : String # ADMIN or USER or GUEST
        email : String
        products: [Int]
    }
    input ChangeNameInput{
        id : ID!
        newName : String!
    }
    input Credentials {
        email : String!
        password : String!
    }
    input ChangeRoleInput{
        id: ID!
        newRole : String# "ADMIN" or "USER" or "GUEST"!
    }
    input AddProductInput{
        id: ID!
        productId : Int!
    }
    type Query{
        getProductsByName(term:String):[Product]
        getProductById(id:ID):Product
        getCategories: [Category]
        getUsers : [User]
        getUserById(userId: String!): User
        getRoles: [Role]
    }
    type Mutation{
        signUp(input:Credentials!): String!
        signIn(input: Credentials!) : String!
        addProduct(input: AddProductInput!): User
        deleteUser(_id: String!): Boolean
        changeRole(input : ChangeRoleInput!) : User
    }
`);