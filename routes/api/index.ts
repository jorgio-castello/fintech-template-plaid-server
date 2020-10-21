import express = require('express');
const router = express.Router();

// Plaid configuration
const plaid = require('plaid');
const plaidConfig = {
    clientID: process.env.PLAID_CLIENT_ID,
    env: plaid.environments.development,
    secret: process.env.PLAID_SECRET,
}

const plaidClient = new plaid.Client(plaidConfig);

// Authentication Controllers & Routes
const AuthenticationController = require('../../controllers/AuthenticationController');
const authenticationController = new AuthenticationController(plaidClient);

router.route('/exchangePublicToken')
    .post(authenticationController.exchangePublicToken);
router.route('/retrieveAccessToken')
    .post(authenticationController.retrieveAccessToken);



module.exports = router;