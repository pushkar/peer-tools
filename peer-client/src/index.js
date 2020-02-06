// @format

import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from 'src/settings'
import App from 'src/App'

// Sentry.init({
// 	dsn: 'https://4b0cdf65fa49449dac70cafe2ccd8b06@sentry.io/227488',
// 	environment: process.env.REACT_APP_ENV,
// })

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root'),
)
