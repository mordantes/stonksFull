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
	},
	name: { 
		type: String,
		required: true,
		minlength: 6,
	},
	role: {
		type : String,
		enum: Object.values(Role),
		required: true,
		default: Role.USER
	}
})

