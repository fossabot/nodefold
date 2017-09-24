#!/usr/bin/env node

/*
  _   _           _       __       _     _
 | \ | | ___   __| | ___ / _| ___ | | __| |
 |  \| |/ _ \ / _` |/ _ \ |_ / _ \| |/ _` |
 | |\  | (_) | (_| |  __/  _| (_) | | (_| |
 |_| \_|\___/ \__,_|\___|_|  \___/|_|\__,_|

*/

import program from 'caporal';

import pkg from './helpers/package';

program
	.bin(pkg.name)
	.version(pkg.version)
	.description(pkg.description);

program.parse(process.argv);
