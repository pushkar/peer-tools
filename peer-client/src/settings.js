import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { WebSocketLink } from 'apollo-link-ws'
import { onError } from 'apollo-link-error'

const uri =
	process.env.REACT_APP_ENV === 'local'
		? 'ws://localhost:8080/api/ws'
		: 'wss://peerexams.appspot.com/api/ws'

const cache = new InMemoryCache()

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`),
		)
	}

	if (networkError) {
		console.log(
			`[Network error ${operation.operationName}]: ${networkError.message}`,
		)
	}
})

const cleanTypeName = new ApolloLink((operation, forward) => {
	if (operation.variables) {
		const omitTypename = (key, value) =>
			key === '__typename' ? undefined : value
		operation.variables = JSON.parse(
			JSON.stringify(operation.variables),
			omitTypename,
		)
	}
	return forward(operation).map((data) => {
		return data
	})
})

const wsLink = new WebSocketLink({
	uri,
	options: {
		reconnect: true,
	},
})

console.log(uri)

export const client = new ApolloClient({
	link: ApolloLink.from([cleanTypeName, errorLink, wsLink]),
	cache,
	connectToDevTools: true,
})
