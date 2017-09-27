import test from 'ava';
import validators from '../src/validators';

test('Author\'s Name', t => {
	t.deepEqual(validators.authorName('Samarth Verma'), true);
	t.deepEqual(validators.authorName(), 'Your Name Is Required');
});

test('Author\'s Email', t => {
	t.deepEqual(validators.authorEmail('example@example.com'), true);
});

test('Author\'s Website', t => {
	t.deepEqual(validators.authorURL('example.com'), true);
});

test('Project Name', t => {
	t.deepEqual(validators.projectName('nodefold'), true);
	t.deepEqual(validators.projectName(), 'Project Name Is Required');
});
