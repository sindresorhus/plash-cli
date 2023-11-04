#!/usr/bin/env node
import process from 'node:process';
import meow from 'meow';
import plash from './api.js';

const cli = meow(`
	Usage
	  $ plash [command]

	Commands
	  add
	  reload
	  next
	  previous
	  random
	  toggle-browsing-mode

	Examples
	  $ plash reload
	  $ plash add https://sindresorhus.com/plash 'Plash website'
	  $ plash add https://sindresorhus.com/plash

	If you don’t specify a title for the “add” command, one will be automatically fetched from the website.
`, {
	importMeta: import.meta,
});

const supportedCommands = [
	'add',
	'reload',
	'next',
	'previous',
	'random',
	'toggle-browsing-mode',
];

let method = cli.input[0];
const options = {};

if (!supportedCommands.includes(method)) {
	console.error(`Unsupported command: ${method}`);
	process.exit(1);
}

if (method === 'add') {
	options.url = cli.input[1];
	options.title = cli.input[2];
}

if (method === 'toggle-browsing-mode') {
	method = 'toggleBrowsingMode';
}

await plash[method](options);
