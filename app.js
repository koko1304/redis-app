const express = require("express");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const schema = require("./schemas");

// Activate Cache
require("./services/cache");

const app = express();

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

const port = process.env.PORT || 3000;

mongoose.connect(
	"mongodb://koko:iloveyou1304@redis-shard-00-00-j6x5s.mongodb.net:27017,redis-shard-00-01-j6x5s.mongodb.net:27017,redis-shard-00-02-j6x5s.mongodb.net:27017/redis?ssl=true&replicaSet=Redis-shard-0&authSource=admin",
	err => {
		if (err) console.log(err);

		console.log("Connected to MongoDB");

		app.listen(port, () => {
			console.log("Server is listening on port", port);
		});
	}
);
