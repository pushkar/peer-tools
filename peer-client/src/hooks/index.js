import { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import cogoToast from 'cogo-toast'
import queries from 'src/queries.gql'

// Errors
export function useGraphQLErrorToast(error) {
	useEffect(() => {
		if (error) {
			error.graphQLErrors.map(({ message }, i) => cogoToast.error(message))
		}
	}, [error])
}

// Query

export function useGetUsers() {
	const { data, error, loading } = useQuery(queries.GetUsers)
	useGraphQLErrorToast(error)
	let users = data && data.users
	return { users, error, loading }
}

export function useGetUser(userId) {
	const { data, error, loading } = useQuery(queries.GetUser, {
		variables: {
			userId,
		},
	})
	useGraphQLErrorToast(error)
	let user = data && data.user
	return { user, error, loading }
}

export function useCreateUser() {
	let mutation = useMutation(queries.CreateUser)
	const [createUser, { error }] = mutation
	useGraphQLErrorToast(error)
	mutation[0] = (variables) =>
		createUser({
			variables,
		}).then((res) => res.data.createUser)
	return mutation
}

export function useGetQuestions() {
	const { data, error, loading } = useQuery(queries.GetQuestions)
	useGraphQLErrorToast(error)
	let questions = data && data.questions
	return { questions, error, loading }
}

export function useGetQuestion(questionId) {
	const { data, error, loading } = useQuery(queries.GetQuestion, {
		variables: {
			questionId,
		},
	})
	useGraphQLErrorToast(error)
	let question = data && data.question
	return { question, error, loading }
}
