import express = require('express');
import plaid, { PlaidError } from 'plaid';
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
        this.getTransactions = this.getTransactions.bind(this);
    }

    getAccounts(req: express.Request, res: express.Response): void {
        const { user } = req.body;
        const accessToken = this.authController.retrieveAccessToken(user);
        
        const plaidAccounts: Promise<plaid.AccountsResponse> = this.plaidClient.getAccounts(accessToken);
        plaidAccounts
            .then((accountsData: plaid.AccountsResponse) => this.hydrator.hydrate<plaid.AccountsResponse>(accountsData, HydratorMap.Accounts))
            .then(payload => res.json(payload))
            .catch((err: PlaidError) => {
                res.status(500);
                res.json(err);
            });
    }

    getTransactions(req: express.Request, res: express.Response): void {
        const { user, startDate, endDate } = req.body;
        const accessToken = this.authController.retrieveAccessToken(user);

        const plaidTransactions: Promise<plaid.TransactionsResponse> = this.plaidClient.getTransactions(accessToken, startDate, endDate);
        plaidTransactions
            .then((transactionsData: plaid.TransactionsResponse) => this.hydrator.hydrate<plaid.TransactionsResponse>(transactionsData, HydratorMap.Transactions))
            .then(payload => res.json(payload))
            .catch((err: PlaidError) => {
                res.status(500);
                res.json(err);
            });
    }
}

module.exports = PlaidController;