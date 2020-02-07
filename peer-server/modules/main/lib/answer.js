const admin = require('firebase-admin')

exports.get = async (questionId, answerId) => {
	const answerRef = admin.firestore().doc(`questions/${questionId}/answers/${answerId}`)
	const answer = await answerRef.get()
	return {
		id: answerRef.path,
		...answer.data(),
	}
}

exports.update = async (questionId, answerId, data) => {
	const answerRef = admin.firestore().doc(`questions/${questionId}/answers/${answerId}`)
	await answerRef.update({
		updated: admin.firestore.FieldValue.serverTimestamp(),
		...data,
	})
	const answer = await answerRef.get()
	return {
		id: answerRef.id,
		...answer.data(),
	}
}

exports.create = async (questionId, data) => {
	let answerRef = admin.firestore().collection(`questions/${questionId}/answers`)
	const answerId = await answerRef.add({
		created: admin.firestore.FieldValue.serverTimestamp(),
		updated: admin.firestore.FieldValue.serverTimestamp(),
		...data,
	})
	const answer = await admin
		.firestore()
		.doc(`questions/${questionId}/answers/${answerId}`)
		.get()
	return {
		id: answerId,
		...answer.data(),
	}
}
