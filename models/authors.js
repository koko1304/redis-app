const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
	name: String,
	age: Number,
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: "Posts"
		}
	]
});

const AuthorModel = mongoose.model("Authors", AuthorSchema);

module.exports = AuthorModel;
