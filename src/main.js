#!/usr/bin/env node

/*
  _   _           _       __       _     _
 | \ | | ___   __| | ___ / _| ___ | | __| |
 |  \| |/ _ \ / _` |/ _ \ |_ / _ \| |/ _` |
 | |\  | (_) | (_| |  __/  _| (_) | | (_| |
 |_| \_|\___/ \__,_|\___|_|  \___/|_|\__,_|

*/
// eslint-disable-next-line import/no-unassigned-import
import 'babel-polyfill';

import program from 'caporal';
import inquirer from 'inquirer';

import pkg from './helpers/package';

import {
	generateQuestions
} from './prompts';

program
	.bin(pkg.name)
	.version(pkg.version)
	.description(pkg.description);

program
	.argument('[project-name]', 'Name Of Your Project')
	.action((args, options, logger) => {
		logger.info('Received', {
			args
		});
		inquirer.prompt(generateQuestions(args)).then(res => {
			logger.info('Response', res);
		});
	});

program.parse(process.argv);
