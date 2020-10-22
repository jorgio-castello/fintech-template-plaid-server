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

// Authentication Controller & Routes
import AuthenticationControllerType from '../../controllers/AuthenticationController';
const AuthenticationController = require('../../controllers/AuthenticationController');
const authenticationController:AuthenticationControllerType = new AuthenticationController(plaidClient);

router.route('/exchangePublicToken')
    .post(authenticationController.exchangePublicToken);
router.route('/retrieveAccessToken')
    .post(authenticationController.retrieveAccessToken);

// Hydrator Configuration
import HydratorType from '../../hydrators/Hydrator';
const Hydrator = require('../../hydrators/Hydrator');
const hydrator:HydratorType = new Hydrator();

// Plaid Data Controllers & Routes
import PlaidControllerType from '../../controllers/PlaidController';
const PlaidController = require('../../controllers/PlaidController');
const plaidController:PlaidControllerType = new PlaidController(authenticationController, plaidClient, hydrator);

router.route('/getAccounts')
    .post(plaidController.getAccounts);
router.route('/getTransactions')
    .post(plaidController.getTransactions);

module.exports = router;