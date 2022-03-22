module.exports = {
	"env": { //Environments，指定代码的运行环境。不同的运行环境，全局变量不一样，指明运行环境这样ESLint就能识别特定的全局变量。同时也会开启对应环境的语法支持，例如：es6。
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [//ESLint 不需要自行定义大量的规则，因为很多规则已被分组作为一个规则配置。
		'eslint:recommended',//就是 ESLint 的推荐规则配置，包含了ESLint的规则 里前面有✔︎的部分，recommended 规则只在ESLint升级大版本的才有可能改变。
		'plugin:vue/essential'
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [//顾名思义就是插件  plugins一般包含一个或多个规则配置，可以在extends中引入。
		'vue'
	],
	'rules': {//这里可以对规则进行细致的定义了，覆盖之前前面说的extends中定义的规则。
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
