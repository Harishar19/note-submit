const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static('public'));//to serve static files like HTML, CSS, and JavaScript files

// Route to handle note submission
app.post('/submit-note', (req, res) => {
  const note = req.body.note;//to get the note from the request body

  if (!note || note.trim() === '') { //to check if the note is empty or contains only whitespace
    return res.status(400).send('Note cannot be empty!'); //to send a 400 Bad Request response with a message
  }

  // Format note with timestamp
  const noteContent = `\n[${new Date().toLocaleString()}]\n${note}\n-----------------\n`;//new Date() function to get the current date and time, and toLocaleString() method to format(human readable) it as a string.

  // Append the note to a file inside "notes" folder
  //fs.appendFile(filePath, content, callback)
  fs.appendFile(path.join(__dirname, 'notes', 'notes.txt'), noteContent, (err) => {
    if (err) { //err is an error object if an error occurred during the file operation
      console.error('Error writing note:', err);
      return res.status(500).send('Failed to save the note.'); //500 Internal Server Error
    }
    res.send('Note submitted successfully!');
  });
});

// Ensure the notes directory exists
const notesDir = path.join(__dirname, 'notes');
if (!fs.existsSync(notesDir)) {//to check if the notes directory exists
  fs.mkdirSync(notesDir); // if does not exist, it creates the directory
}

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); 
});
