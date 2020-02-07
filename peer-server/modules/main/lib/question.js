const admin = require('firebase-admin')

exports.get = async (questionId) => {
	if (questionId) {
		const questionRef = admin.firestore().doc(`questions/${questionId}`)
		const question = await questionRef.get()
		return {
			id: questionRef.path,
			...question.data(),
		}
	}
	const questionsRef = admin.firestore().collection(`questions`)
	const questions = await questionsRef.get()
	return questions.docs.map((question) => ({
		id: question.id,
		...question.data(),
	}))
}

exports.update = async (questionId, data) => {
	const questionRef = admin.firestore().doc(`questions/${questionId}`)
	await questionRef.update({
		updated: admin.firestore.FieldValue.serverTimestamp(),
		...data,
	})
	const question = await questionRef.get()
	return {
		id: questionRef.path,
		...question.data(),
	}
}
