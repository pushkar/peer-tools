// @format

const { makeExecutableSchema } = require('apollo-server-express')
const { GraphQLModule } = require('@graphql-modules/core')
const main = require('./main')

module.exports = {
	module: new GraphQLModule({
		imports: [main.module],
	}),
	schema: makeExecutableSchema({
		typeDefs: [main.typeDefs],
		resolvers: [main.resolvers],
	}),
}
