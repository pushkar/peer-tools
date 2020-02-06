// @format

const path = require('path')

const { loaderByName, addBeforeLoader } = require('@craco/craco')

module.exports = {
	webpack: {
		configure: (webpackConfig, { env, paths }) => {
			const rules = [
				{
					test: /\.(graphql|gql)$/,
					exclude: /node_modules/,
					loader: 'graphql-tag/loader',
				},
			]

			let oneOf = webpackConfig.module.rules.find((rule) => rule.oneOf != null)
			let configRules = oneOf != null ? oneOf.oneOf : webpackConfig.module.rules
			configRules
				.find((rule) => rule.loader != null && rule.loader.match(/file-loader/))
				.exclude.push(...rules.map((rule) => rule.test))
			configRules.push(...rules)

			webpackConfig['resolve'] = {
				...webpackConfig.resolve,
				alias: {
					...webpackConfig.resolve.alias,
					src: path.resolve(__dirname, 'src'),
					lib: path.resolve(__dirname, 'src/lib'),
					static: path.resolve(__dirname, 'src/static'),
				},
			}

			addBeforeLoader(webpackConfig, loaderByName('file-loader'), {
				test: /\.ne$/,
				use: ['nearley-loader'],
			})

			return webpackConfig
		},
	},
}
