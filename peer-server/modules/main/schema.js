// @format

const { gql } = require('apollo-server-express')

const typeDefs = gql`
	scalar DateTime

	type Query {
		user: User
	}

	type User {
		created: DateTime
		updated: DateTime
		username: String
		displayName: String
		disabled: Boolean
	}
`

module.exports = typeDefs
