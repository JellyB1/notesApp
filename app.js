// Require NPM
const chalk = require('chalk')
const validator = require('validator')
const yargs = require('yargs')

// Require functions from local files
const notes = require('./notes')
const { getNotes } = require('./notes')

// Code


// Create add command
yargs.command({
	command: 'add', 
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
		body: {
			describe: 'Note content',
			demandOption: true,
			type: 'string',
		}
	},
	handler(argv) {
		notes.addNote(argv.title, argv.body)
	}
})

// Create a remove command
yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		notes.removeNote(argv.title)
	}
})

// Read a note
yargs.command({
	command: 'read',
	describe: 'Read selected note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		notes.readNote(argv.title)
	}
})

// List the note
yargs.command({
	command: 'list',
	describe: 'List all notes',
	handler(argv) {
		notes.getNotes(argv)
	}
})


yargs.parse()