const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

const AuthorModel = require("../../models/authors");

const PostType = new GraphQLObjectType({
	name: "Post",
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		content: { type: GraphQLString },
		author: {
			type: require("./author-type"),
			resolve: (parent, args) => {
				return AuthorModel.findById(parent.author);
			}
		}
	})
});

module.exports = PostType;
