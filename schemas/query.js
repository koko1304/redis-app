const { GraphQLObjectType, GraphQLID, GraphQLNonNull } = require("graphql");

const PostModel = require("../models/posts");
const AuthorModel = require("../models/authors");

const PostType = require("./types/post-type");
const AuthorType = require("./types/author-type");

const RootQuery = new GraphQLObjectType({
	name: "RootQuery",
	fields: {
		post: {
			type: PostType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: async (parent, args) => {
				return PostModel.findById(args.id).cache();
			}
		},
		author: {
			type: AuthorType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (parent, args) => {
				return AuthorModel.findById(args.id);
			}
		}
	}
});

module.exports = RootQuery;
