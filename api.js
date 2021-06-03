import {promisify} from 'node:util';
import childProcess from 'node:child_process';

const execFile = promisify(childProcess.execFile);

const execute = async (command, arguments_ = {}) => {
	let searchParameters = new URLSearchParams(arguments_).toString();
	searchParameters = searchParameters.length > 0 ? `?${searchParameters}` : '';

	await execFile('open', ['--background', `plash:${command}${searchParameters}`]);
};

const plash = {};

plash.add = async ({url, title}) => {
	if (!url) {
		throw new TypeError('The `url` parameter is required.');
	}

	await execute('add', {url, title});
};

plash.reload = async () => {
	await execute('reload');
};

plash.next = async () => {
	await execute('next');
};

plash.previous = async () => {
	await execute('previous');
};

plash.random = async () => {
	await execute('random');
};

plash.toggleBrowsingMode = async () => {
	await execute('toggle-browsing-mode');
};

export default plash;
