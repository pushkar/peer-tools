// @format

const { GraphQLModule } = require('@graphql-modules/core')
const { AuthenticationError } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const admin = require('firebase-admin')

module.exports = {
	module: new GraphQLModule({
		typeDefs,
		resolvers,
	}),
	typeDefs: typeDefs,
	resolvers: resolvers,
}
