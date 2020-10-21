require('dotenv').config();
import express = require('express');
import cors = require('cors');

const app: express.Application = express();
app.use(express.json());
app.use(cors());

require('./routes')(app);

const port: string = process.env.PORT || '9000';
app.listen(port, () => console.log(`Plaid Server listening on Port ${port}...`));