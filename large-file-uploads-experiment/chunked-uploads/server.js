const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();

const upload = multer({ dest: 'temp/' });

app.post('/upload', upload.single('file'), (req, res) => {
    const chunkNumber = req.body.resumableChunkNumber;
    const totalChunks = req.body.resumableTotalChunks;
    const originalFilename = req.body.resumableFilename;
    const tempFilePath = req.file.path;

    const destPath = path.join(__dirname, 'uploads', originalFilename);

    // Append the current chunk to the file
    fs.appendFile(destPath, fs.readFileSync(tempFilePath), (err) => {
        if (err) return res.status(500).send('Chunk append failed.');

        fs.unlinkSync(tempFilePath); // Remove temporary file

        // Check if all chunks are uploaded
        if (chunkNumber == totalChunks) {
            res.send('Upload completed successfully.');
        } else {
            res.send('Chunk uploaded successfully.');
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
