// @format

const { gql } = require('apollo-server-express')

const typeDefs = gql`
	scalar DateTime

	type Query {
		users: [User]
		user(userId: String!): User
		questions: [Question]
		question(questionId: String!): Question
		captcha(captchaId: String!): Captcha
	}

	type Mutation {
		createUser(userId: String!): User
		createCaptcha(questionId: String!): [Captcha]
		gradeCaptcha(captchaId: String!): [Captcha]
	}

	type User {
		id: ID!
		email: String
		created: DateTime
		updated: DateTime
		username: String
		displayName: String
		disabled: Boolean
	}

	type Answer {
		id: ID!
		text: String!
		totalGrades: Int
		correctness: Float
		editable: Boolean
	}

	type Question {
		id: ID!
		text: String!
		answers: [Answer]
	}

	type Grade {
		answer: [Answer]
		user: [User]
		grade: String
	}

	type Captcha {
		id: ID!
		question: [Question]
		grades: [Grade]
	}
`

module.exports = typeDefs
