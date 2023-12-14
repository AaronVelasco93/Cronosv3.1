//use express
import express from 'express';
import { handler } from './svelte/build/handler.js';
import fs from 'fs/promises';
import csv from 'csv-parser';

const app = express()
const port = 3000


app.use(handler)

app.get('/', (req, res) => {
    res.send('Page Index')
})

app.post('/api/v1/upload-csv-file', (req, res) => {
    if (!req.files || !req.files.csvFile) {
        return res.status(400).send('No files were uploaded.');
    }

    const csvFile = req.files.csvFile;

    // Validate if the file is CSV
    if (!csvFile.mimetype.includes('csv')) {
        return res.status(400).send('Uploaded file is not a CSV.');
    }

    // Read the file
    const filePath = __dirname + '/uploads/' + csvFile.name;
    csvFile.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        // Parse the CSV file
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                // Remove the file after parsing
                fs.unlinkSync(filePath);

                // Use 'results' array containing parsed CSV data
                // For example, you can process the data here

                res.status(200).json({ message: 'CSV file uploaded and parsed successfully.', data: results });
            });
    });
});

app.listen(port, () => {
    console.log(`Cronos app listening at http://localhost:${port}`)
})