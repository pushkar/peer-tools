const admin = require('firebase-admin')

exports.get = async (userId) => {
	if (userId) {
		const userRef = admin.firestore().doc(`users/${userId}`)
		const user = await userRef.get()
		return {
			id: userRef.path,
			...user.data(),
		}
	}
	const usersRef = admin.firestore().collection(`users`)
	const users = await usersRef.get()
	return users.docs.map((user) => ({
		id: user.id,
		...user.data(),
	}))
}

exports.update = async (userId, data) => {
	const userRef = admin.firestore().doc(`users/${userId}`)
	await userRef.update({
		updated: admin.firestore.FieldValue.serverTimestamp(),
		...data,
	})
	const user = await userRef.get()
	return {
		id: userRef.id,
		...user.data(),
	}
}

exports.create = async (userId, data) => {
	const userRef = admin.firestore().doc(`users/${userId}`)
	let user = await userRef.get()
	if (!user.exists) {
	await userRef.set({
			created: admin.firestore.FieldValue.serverTimestamp(),
			updated: admin.firestore.FieldValue.serverTimestamp(),
			...data,
		})
	}
	user = await userRef.get()
	return {
		id: userRef.id,
		...user.data(),
	}
}
