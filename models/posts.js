const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: String,
	content: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: "Authors"
	}
});

const PostModel = mongoose.model("Posts", PostSchema);

module.exports = PostModel;
