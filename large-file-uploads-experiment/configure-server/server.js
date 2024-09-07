const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Set limit for body size
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Increase the default timeout (in milliseconds)
app.use((req, res, next) => {
    req.setTimeout(300000); // 300 seconds (5 minutes)
    res.setTimeout(300000);
    next();
});

// Route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
