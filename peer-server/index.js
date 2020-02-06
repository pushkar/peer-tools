// @format

require('dotenv').config()
const express = require('express')
const { GraphQLModule } = require('@graphql-modules/core')
const { ApolloServer, AuthenticationError } = require('apollo-server')
const admin = require('firebase-admin')
const modules = require('./modules')
admin.initializeApp()

const getAuthenticatedUser = async (token) => {
	if (token == undefined) {
		// For API's that don't need the user in the context
		return {}
	}

	if (token.startsWith('CLI ')) {
		token = token.split('CLI ')[1]
		return { user: await admin.auth().getUser(token) }
	}

	return { user: await admin.auth().verifyIdToken(token) }
}

const server = new ApolloServer({
	// Disabled using graphql-modules because of an apollo graphql bug where scalars are somehow not in typeDefs
	// See https://github.com/apollographql/apollo-server/issues/2218
	// modules: [modules.module],
	// context: session => session,
	schema: modules.schema,
	context: async ({ req, payload }) => {
		try {
			// https://gist.github.com/cowlicks/71e766164647f224bf15f086ea34fa52
			if (payload) {
				console.log(`Query is ${payload.operationName}`)
				return await getAuthenticatedUser(payload.authToken)
			}

			return await getAuthenticatedUser(req.get('authorization'))
		} catch (err) {
			throw new AuthenticationError(err)
		}
	},
	subscriptions: {
		keepAlive: 1000,
		onConnect: async (connectionParams, websocket, context) => {
			console.log('Connected', connectionParams)
		},
		onDisconnect: (websocket, context) => {
			console.log('WS Disconnected! -> ')
		},
		path: '/api/ws',
	},
	playground: true,
	introspection: true,
})

const port = process.env.PORT || 8080
console.log(`Currently attached to ${process.env.GOOGLE_CLOUD_PROJECT}`)
console.log(`Bucket ${process.env.GOOGLE_CLOUD_PROJECT}.appspot.com`)

server.listen({ port }).then(({ url, subscriptionsUrl }) => {
	console.log(`🚀 Server ready at ${url}`)
	console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`)
})
