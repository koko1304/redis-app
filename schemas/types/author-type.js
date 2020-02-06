const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList } = require("graphql");

const PostModel = require("../../models/posts");

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		posts: {
			type: new GraphQLList(require("./post-type")),
			resolve: (parent, args) => {
				return PostModel.find({ _id: parent.posts });
			}
		}
	})
});

module.exports = AuthorType;
