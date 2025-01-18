const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const csvToJson = require('./csvToJson');
const pg = require('./pg');

app.post('/upload', async (req, res) => {
  try {
    const users = csvToJson(process.env.CSV_FILE_PATH)
    await pg.insertData(users);
    await pg.calculateAgeDistribution();
    res.status(200).send('Data uploaded and processed successfully');
  } catch (err) {
    res.status(500).send('Error processing data: ' + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


