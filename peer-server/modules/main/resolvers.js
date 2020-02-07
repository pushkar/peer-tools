// @format

const admin = require('firebase-admin')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const user = require('./lib/user.js')
const question = require('./lib/question')
const answer = require('./lib/answer')
const captcha = require('./lib/captcha')

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
		users: async (_, {}) => {
			console.log(`Fetching users`)
			return user.get()
		},

		user: async (_, { userId }) => {
			console.log(`Fetching user ${userId}`)
			return user.get(userId)
		},

		questions: async (_, {}) => {
			console.log(`Fetching questions`)
			return question.get()
		},

		question: async (_, { questionId }) => {
			console.log(`Fetching question ${questionId}`)
			return question.get(questionId)
		},

		captcha: async (_, { captchaId }) => {
			console.log(`Fetching captcha ${captchaId}`)
			return captcha.get(captchaId)
		},
	},

	Mutation: {
		createUser: async (_, { userId }, context) => {
			console.log(`Create user ${userId}`)
			return user.create(userId)
		},

		createCaptcha: async (_, { questionId }, context) => {
			console.log(`Create a captcha for ${questionId}`)
			return captcha.create(questionId)
		},

		gradeCaptcha: async (_, { captchaId }, context) => {
			console.log(`Grading captcha ${captchaId}`)
			return captcha.grade(captchaId)
		},
	},

	Question: {
		answers: async (question, _, context) => {
			return answer.get(question.id)
		},
	},
}
