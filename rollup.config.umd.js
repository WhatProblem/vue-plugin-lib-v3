import baseConfig, {file} from './rollup.config'

export default {
	...baseConfig,
	output: {
		name: 'index',
		file: file('umd'),
		format: 'umd',
		globals: {
			vue: 'Vue' // vue 全剧对象名称，若是 lodash 应为 _
		},
		exports: 'named',
	}
}