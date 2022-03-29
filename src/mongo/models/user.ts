import { isEmail } from "class-validator"
import { Schema, model , Types} from "mongoose"
import { Products } from ".."

export enum Role {
	ADMIN = "ADMIN",
	GUEST = "GUEST",
	USER = "USER"
}

export const UserSchema = new Schema({
	_id: {
		type: Types.ObjectId,
		required: true,
		auto:true,
	},
	products: {
		type: Array,
		required: false,
		default: [],
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		minlength: 10,
		validate: [(val: string) => isEmail(val) , 'Value is not Email']
	},
	role: {
		type : String,
		enum: Object.values(Role),
		required: true,
		default: Role.USER
	}
})

