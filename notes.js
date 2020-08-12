const fs = require('fs')
const chalk = require('chalk')

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
	try {
			const dataBuffer = fs.readFileSync('notes.json')
			const dataJSON = dataBuffer.toString()
			return JSON.parse(dataJSON)
	} catch (e) {
			return []
	}	
}

// Add note function
const addNote = (title, body) => {
	const notes = loadNotes()

	const duplicateNote = notes.find(
		note => note.title === title
	)

	if (!duplicateNote) {
		notes.push({
			title,
			body
		})
		
		saveNotes(notes)

		console.log(
			chalk.green.bold('New note added!')
		)
	} else {
		console.log(
			chalk.red.bold('Note title taken!')
		)
	}
}

// Remove Note function
const removeNote = (title) => {
	const notes = loadNotes()
	
	const notesToKeep = notes.filter(
		// return true for the notes we want to keep
		note => note.title !== title
	)
	
	
	if (notes.length > notesToKeep.length) {
		saveNotes(notesToKeep)

		console.log(
			chalk.green.inverse('Note removed!')
		)
	} else {
		console.log(
			chalk.red.inverse('No note found!')
		)
	}
}

// List notes
const listNotes = () => {
	const notes = loadNotes();
	
	console.log(
		chalk.blue.underline('Your notes:')
	)
	
	notes.map(note => {
		console.log(
			`Note: ${chalk.blue(note.title)}`
		)
	})
}

// Read note
const readNote = (title) => {
	const notes = loadNotes()

	const note = notes.find(
		note => note.title === title
	)

	if (note) {
		console.log(
			chalk.inverse(note.title)
		)
		console.log(note.body)
	} else {
		console.log(
			chalk.red.inverse('Note not found')
		)
	}
}

// Export functions
module.exports = {
	addNote,
	removeNote,
	listNotes,
	readNote
}