import _ from 'lodash';
import validator from 'validator';
/**
 * Checks For A Valid Node Module Name
 * @param {string} [name=''] The Name Of The Module
 * @returns {any} The Response Of The Validation
 */
function projectName(name = '') {
	if (name === false || name === '') {
		return 'Project Name Is Required';
	}
	if (name.length > 60) {
		return 'Project Name Should Not Exceed 60 Characters';
	}
	if (name.startsWith('.')) {
		return 'Project Name Should Not Start With A Period';
	}
	if (name.startsWith('_')) {
		return 'Project Name Should Not Start With An Underscore';
	}
	if (name.startsWith('-')) {
		return 'Project Name Should Not Start With A Hyphen';
	}
	if (name !== name.trim()) {
		return 'Project Name Should Not Contain Leading Or Trailing Spaces';
	}
	if (name !== name.toLowerCase()) {
		return 'Project Name Should Not Contain Capital Letters';
	}
	if (/[~'!@()*]/.test(name)) {
		return 'Project Name Should Not Contain Special Characters	("~\'!@()*")';
	}
	if (name !== encodeURIComponent(name)) {
		return 'Project Name Can Only Contain URL-Friendly Characters';
	}
	return true;
}

/**
 * Checks For A Valid Name
 * @param {string} [name=''] The Name Of The Module
 * @returns {any} The Response Of The Validation
 */
function authorName(name = '') {
	name = name.replace(/\s+/g, ' ');
	if (name === false || name === '') {
		return 'Your Name Is Required';
	}
	if (/^[a-zA-Z\s]+$/.test(name) === false) {
		return 'Your Name Should Contain Only Alphabets';
	}
	if (name.length > 125) {
		return 'Your Name Should Contain Less Than 125 Characters';
	}
	return true;
}

/**
 * Checks For A Valid Email
 *
 * @param {string} email The Email Address
 * @returns {any} The Response Of The Validation
 */
function authorEmail(email) {
	email = _.trim(email);
	if (email === false || email === '') {
		return 'Your Email Address Is Required';
	}
	if (validator.isEmail(email) === false) {
		return 'Please Provide A Valid Email Address';
	}
	return true;
}

/**
 * Checks For A Valid URL
 *
 * @param {string} [url=''] The URL(Uniform Resource Locator)
 * @returns {any} The Response Of The Validation
 */
function authorURL(url = '') {
	url = _.trim(url);
	if (!url || url === '') {
		return true;
	}
	if (validator.isURL(url) === false) {
		return 'Please Provide A Valid URL';
	}
	return true;
}

export default {
	authorName,
	authorEmail,
	authorURL,
	projectName
};
