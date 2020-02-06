require('dotenv').config()
const ptClient = require('perfecttense')

ptClient.initialize({
	appKey: process.env.PT_APP_KEY,
})

// ptClient.getUsage(process.env.PT_API_KEY).then(function(result) {
// 	const numReqRemaining = result.data.apiRemainToday
// 	console.log(`${numReqRemaining} requests remaining`)
// })

function ptSuccess(result) {
	// Print the current text of the result (the original text submitted)
	console.log(result)
	console.log(ptClient.getCurrentText(result))
}

function ptFailure(error) {
	switch (error.status) {
		// User's API key is invalid/expired
		case 401:
			handleBadApiKey()
			break

		// User is over their daily API limit
		case 403:
			handleOverApiLimit()
			break

		// Other error - see API documentation
		default:
			handleOtherError()
	}
}

ptClient.submitJob('Sm incrrect text', process.env.PT_API_KEY).then(ptSuccess, ptFailure)
