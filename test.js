import process from 'node:process';
import test from 'ava';
import {execa} from 'execa';

test('main', async t => {
	if (process.env.CI) {
		t.pass();
		return;
	}

	await execa('./cli.js', ['add', 'https://sindresorhus.com/plash']);
	await execa('./cli.js', ['add', 'https://sindresorhus.com/plash', 'Plash website']);
	await execa('./cli.js', ['reload']);
	await execa('./cli.js', ['next']);
	await execa('./cli.js', ['previous']);
	await execa('./cli.js', ['toggle-browsing-mode']);
	t.pass();
});
