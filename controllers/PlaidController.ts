import express = require('express');
import plaid from 'plaid';
import Hydrator from '../hydrators/Hydrator';
import HydratorMap from '../interfaces/Hydrator';
import AuthenticationController from './AuthenticationController';

export default class PlaidController {
    authController: AuthenticationController;
    plaidClient: plaid.Client;
    hydrator: Hydrator; 
    
    constructor(AuthController: AuthenticationController, PlaidClient: plaid.Client, Hydrator: Hydrator) {
        this.authController = AuthController;
        this.plaidClient = PlaidClient;
        this.hydrator = Hydrator;

        this.getAccounts = this.getAccounts.bind(this);
    }

    getAccounts(req: express.Request, res: express.Response): void {
        const { user } = req.body;
        const accessToken = this.authController.retrieveAccessToken(user);
        
        const plaidAccounts: Promise<plaid.AccountsResponse> = this.plaidClient.getAccounts(accessToken);
        plaidAccounts
            .then(accountsData => this.hydrator.hydrate<plaid.AccountsResponse>(accountsData, HydratorMap.Accounts))
            .then(payload => res.json(payload))
            .catch(); // implement error handling
    }
}

module.exports = PlaidController;