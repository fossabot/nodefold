import normalizeURL from 'normalize-url';
import _ from 'lodash';

import gitConfig from './helpers/git-config';
import githubUsername from './helpers/github-username';
import npmConfig from './helpers/npm-config';

import validators from './validators';

/**
 * Generates The Prompts For The Cli
 *
 * @param {object} args Argumnets Received From The CLI
 * @returns {object} The List Of Questions With Necessary Data
 */
export function generateQuestions(args) {
	const questions = [{
		type: 'confirm',
		message: 'Generate The Project In Current Directory ?',
		name: 'sameDir',
		default: false,
		when: () => !args.projectName
	}, {
		type: 'confirm',
		message: 'Are You Sure (It Will Delete All The Contents Of This Directory) ?',
		name: 'sameDirConfirm',
		default: false,
		when: response => response.sameDir
	}, {
		type: 'input',
		message: 'Name Of Your New Project -',
		name: 'projectName',
		default: () => args.projectName || null,
		when: response => {
			if (!args.projectName) {
				if (response.sameDirConfirm === false || response.sameDir === false) {
					return false;
				}
				return true;
			}
			return true;
		},
		validate: input => validators.projectName(input)
	}, {
		type: 'input',
		message: 'Project\'s Description -',
		name: 'projectDescription',
		when: response => response.projectName
	}, {
		type: 'input',
		message: 'Project\'s Keywords -',
		name: 'projectKeywords',
		when: response => response.projectName,
		filter: input => {
			const words = _.split(input, ',');
			const keywords = [];
			words.forEach(el => {
				keywords.push(_.trim(el.replace(/\s+/g, ' ')));
			});
			return keywords.length > 0 ? keywords : '';
		}
	}, {
		type: 'input',
		message: 'Your Name -',
		name: 'authorName',
		default: async () => {
			const config = await gitConfig();
			return npmConfig.get('init-author-name') || config.user.name || null;
		},
		validate: input => validators.authorName(input),
		filter: input => {
			const words = _.words(input);
			const name = [];
			words.forEach(el => {
				name.push(_.upperFirst(el));
			});
			return name.join(' ').replace(/\s+/g, ' ');
		},
		when: response => response.projectName
	}, {
		type: 'input',
		message: 'Your Email Address -',
		name: 'authorEmail',
		default: async () => {
			const config = await gitConfig();
			return npmConfig.get('init-author-email') || config.user.email || null;
		},
		validate: input => validators.authorEmail(input),
		when: response => response.authorName
	}, {
		type: 'input',
		message: 'Your Github Username -',
		name: 'authorGithubUsername',
		default: async response => {
			const username = await githubUsername(response.authorEmail);
			return username === false ? null : username;
		},
		when: response => response.authorEmail
	}, {
		type: 'input',
		message: 'Your Website\'s URL -',
		name: 'authorURL',
		default: () => npmConfig.get('init-author-url') || null,
		validate: input => validators.authorURL(input),
		filter: input => {
			return input !== '' && input ? _.trim(normalizeURL(input)) : input;
		},
		when: response => response.authorEmail
	}, {
		type: 'confirm',
		message: 'Enable Linting ? ',
		name: 'enableLinting',
		default: true,
		when: response => response.authorEmail
	}, {
		type: 'list',
		message: 'Choose Your Linter - ',
		choices: [{
			name: 'Standard',
			value: 'standard'
		}, {
			name: 'XO',
			value: 'xo'
		}],
		name: 'linter',
		default: () => 1,
		when: response => response.enableLinting
	}, {
		type: 'confirm',
		message: 'Enable Unit Testing With Ava ? ',
		name: 'enableTesting',
		default: true,
		when: response => response.authorEmail
	}];
	const prompts = [];
	questions.forEach(el => {
		prompts.push({
			type: el.type,
			name: el.name,
			message: el.message,
			choices: _.isObject(el.choices) ? el.choices : null,
			default: _.isBoolean(el.default) || el.default ? el.default : null,
			validate: el.validate || function () {
				return true;
			},
			filter: el.filter || function (a) {
				return _.trim(a);
			},
			when: el.when || null
		});
	}, this);
	return prompts;
}
export default {
	generateQuestions
};
