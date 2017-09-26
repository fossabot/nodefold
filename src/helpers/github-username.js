import githubUsername from 'github-username';

export default email => {
	return new Promise(resolve => {
		if (email) {
			githubUsername(email).then(username => {
				resolve(username);
			}).catch(() => {
				resolve(false);
			});
		} else {
			resolve(false);
		}
	});
};
