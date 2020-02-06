const mongoose = require("mongoose");
const util = require("util");
const redis = require("redis");

const redisURL = "redis://127.0.0.1:6379";

const client = redis.createClient(redisURL);
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
	this._cache = true;
	this._hashKey = JSON.stringify(options.key || "");

	return this;
};

mongoose.Query.prototype.exec = async function() {
	if (!this._cache) {
		console.log("Not cache");
		return exec.apply(this, arguments);
	}
	// Copy all objects into a single object
	const key = JSON.stringify(Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name }));

	const cacheValue = await client.hget(this._hashKey, key);

	if (cacheValue) {
		console.log("Serving from cache");
		const parseCache = JSON.parse(cacheValue);

		if (Array.isArray(parseCache)) {
			return parseCache.map(doc => {
				return new this.model(doc);
			});
		}

		return new this.model(parseCache);
	}

	console.log("Serving from MongoDB");
	const result = await exec.apply(this, arguments);

	client.hset(this._hashKey, key, JSON.stringify(result));
	client.expire(this._hashKey, 200);

	return result;
};

module.exports = {
	clearHash: hashKey => {
		client.del(JSON.stringify(hashKey));
	}
};
