import { Schema, model } from "mongoose"

export const ProductSchema = new Schema({
	_id: {
		type: Number,
		required: true,
	},
	goodName: {
		type: String,
		required: true,
	},
	offer: {
		type: Number || Boolean,
		required: true,
	},
	actual: {
		type: Boolean,
		required: true,
	},
	shopName: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		require: true,
	},
	prices: {
		type : Array,
		requre: true
	},
	sub: {
		type : Number,
		requre: true
	}
})


