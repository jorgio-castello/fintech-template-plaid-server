require('dotenv').config();
import express = require('express');

const app: express.Application = express();

const port: string = process.env.PORT || '9000';
app.listen(port, () => console.log(`Plaid Server listening on Port ${port}...`));