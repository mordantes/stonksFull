require('dotenv').config()
import mongoose from "mongoose"
import { ProductSchema } from "./models/product"
import { UserSchema } from "./models/user"

const configStore = process.env
const MONGODB_URI =  `mongodb+srv://${configStore.MONGO_USER}:${configStore.MONGO_PWD}@cluster0.fitvd.mongodb.net/${configStore.MONGO_DB}?retryWrites=true&w=majority`


mongoose.connect(MONGODB_URI);

let db = mongoose.connection;

db.on('error', () => {
    console.error("Error while connecting to DB");
});



const Products = mongoose.model('products2', ProductSchema);
const Users = mongoose.model('users', UserSchema);



export {
	Products,
	Users
}