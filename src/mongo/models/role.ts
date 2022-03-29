import { Schema, model , Types} from "mongoose"
import { Products } from ".."

export enum Role {
	ADMIN = "ADMIN",
	GUEST = "GUEST",
	USER = "USER"
}

export const RoleSchema = new Schema({
	_id: {
		type: Types.ObjectId,
		required: true,
		auto:true,
	},
	role: {
		type : String,
		enum: Object.values(Role),
		required: true,
		default: Role.USER
	},
	cartSize : {
		type: Number,
		required: true,
		default: 10
	}
})

