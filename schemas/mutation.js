const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLList } = require("graphql");

const PostModel = require("../models/posts");
const AuthorModel = require("../models/authors");

const PostType = require("./types/post-type");
const AuthorType = require("./types/author-type");

const { clearHash } = require("../services/cache");

const RootMutation = new GraphQLObjectType({
	name: "RootMutation",
	fields: {
		addPost: {
			type: PostType,
			args: {
				title: {
					type: new GraphQLNonNull(GraphQLString)
				},
				content: {
					type: new GraphQLNonNull(GraphQLString)
				},
				author: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (parent, args) => {
				const newPost = new PostModel({ title: args.title, content: args.content, author: args.author });

				clearHash("");
				return AuthorModel.findOneAndUpdate({ _id: args.author }, { $push: { posts: newPost.id } }).then(() => newPost.save());
			}
		},
		addAuthor: {
			type: AuthorType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				age: {
					type: new GraphQLNonNull(GraphQLInt)
				},
				posts: {
					type: new GraphQLList(GraphQLID)
				}
			},
			resolve: (parent, args) => {
				const newUser = new AuthorModel({ name: args.name, age: args.age, posts: args.posts });

				return newUser.save();
			}
		}
	}
});

module.exports = RootMutation;
