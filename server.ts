require('dotenv').config();
import express = require('express');
import cors = require('cors');

const app: express.Application = express();
app.use(express.json());
app.use(cors());

const plaid = require('plaid');
const plaidConfig = {
    clientID: process.env.PLAID_CLIENT_ID,
    env: plaid.environments.development,
    secret: process.env.PLAID_SECRET,
}

const plaidClient = new plaid.Client(plaidConfig);


const port: string = process.env.PORT || '9000';
app.listen(port, () => console.log(`Plaid Server listening on Port ${port}...`));