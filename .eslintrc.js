module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/recommended', 'prettier', 'prettier/vue'],
	plugins: ['prettier', 'vue'],
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'prettier/prettier': 'off',

		'vue/component-tags-order': [
			'error',
			{
				order: [['script', 'template'], 'style'],
			},
		],
	},
};
