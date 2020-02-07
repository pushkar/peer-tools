const admin = require('firebase-admin')

exports.get = async (captchaId) => {
	const captchaRef = admin.firestore().doc(`captcha/${captchaId}}`)
	const captcha = await captchaRef.get()
	return {
		id: captchaRef.path,
		...captcha.data(),
	}
}

exports.update = async (captchaId, data) => {
	const captchaRef = admin.firestore().doc(`captcha/${captchaId}`)
	await captchaRef.update({
		updated: admin.firestore.FieldValue.serverTimestamp(),
		...data,
	})
	const captcha = await captchaRef.get()
	return {
		id: captchaRef.path,
		...captcha.data(),
	}
}

exports.create = async (data) => {
	let captchaRef = admin.firestore().collection(`captcha`)
	const captchaId = await captchaRef.add({
		created: admin.firestore.FieldValue.serverTimestamp(),
		updated: admin.firestore.FieldValue.serverTimestamp(),
		...data,
	})
	const captcha = await admin
		.firestore()
		.doc(`captcha/${captchaId}`)
		.get()
	return {
		id: captchaId,
		...captcha.data(),
	}
}
