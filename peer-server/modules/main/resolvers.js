// @format

const admin = require('firebase-admin')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

module.exports = {
	DateTime: new GraphQLScalarType({
		name: 'DateTime',
		description: 'Firebase DateTime: Returns time in seconds',
		parseValue(value) {
			switch (typeof value) {
				case 'number':
					return (value * Math.pow(10, 13 - Math.ceil(Math.log10(value)))) / 1000

				case 'object':
					return value._seconds

				case 'string':
					return new Date(value).getTime() / 1000

				default:
					throw new Error(`Unexpected value: ${value}`)
			}
		},
		serialize(value) {
			switch (typeof value) {
				case 'number':
					return (value * Math.pow(10, 13 - Math.ceil(Math.log10(value)))) / 1000

				case 'object':
					return value._seconds

				case 'string':
					return new Date(value).getTime() / 1000

				default:
					throw new Error(`Unexpected value: ${value}`)
			}
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return new Date(ast.value)
			}
			return null
		},
	}),

	Query: {
		user: async (_, {}, context) => {
			console.log(`Fetching user ${context.user.uid}`)
			return {}
		},
	},
}
