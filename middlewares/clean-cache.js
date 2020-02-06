// This file is using with route but we can't use with graphql
const { clearHash } = require("../services/cache");

module.exports = async (req, res, next) => {
	// Let the route function run first before clear any cache
	await next();

	clearHash("");
};
