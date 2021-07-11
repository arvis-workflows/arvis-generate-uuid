'use strict';

const arvish = require('arvish');
const {v1: uuidv1} = require('uuid');
const {v4: uuidv4} = require('uuid');

const output = [];

function addAutocompleteOutput(title, subtitle, autocomplete) {
	output.push({
		title,
		subtitle,
		autocomplete,
		valid: true,
		arg: 'uid ' + autocomplete,
		variables: {
			action: 'autocomp'
		}
	});
}

function addUuidOutput(uuid, version) {
	output.push({
		title: uuid,
		subtitle: `UUID${version}, Actions:  ⏎ to copy`,
		arg: uuid,
		text: {
			copy: uuid,
			largetype: uuid
		},
		variables: {
			action: 'copy'
		}
	});
}

function genUuids(generator, version, count = 4) {
	for (let i = 0; i < count; i += 1) {
		const uuid = generator();
		addUuidOutput(uuid, version);
	}
}

if (arvish.input.toLowerCase() === 'v1') {
	genUuids(uuidv1, 'v1');
} else if (arvish.input.toLowerCase() === 'v4') {
	genUuids(uuidv4, 'v4');
} else {
	addAutocompleteOutput(`uuid v4`, 'Generate v4 UUIDs', 'v4');
	addAutocompleteOutput(`uuid v1`, 'Generate v1 UUIDs', 'v1');
}

arvish.output(output);
