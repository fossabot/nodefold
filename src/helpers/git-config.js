import gitConfig from 'git-config';

export default () => {
	return new Promise(resolve => {
		gitConfig((err, config) => {
			resolve(err ? false : config);
		});
	});
};
