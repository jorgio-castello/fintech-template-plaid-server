import express = require('express');
import plaid from 'plaid';

interface accessTokenStore { // this will eventually need to be abstracted to database
    [key:string]: string,
}

export default class AuthenticationController {
    plaidClient: plaid.Client;
    accessTokenStore: accessTokenStore = { jorge: process.env.PLAID_ACCESS_TOKEN || '' };
    
    constructor(plaidClient: plaid.Client) {
        this.plaidClient = plaidClient;

        this.exchangePublicToken = this.exchangePublicToken.bind(this);
        this.retrieveAccessToken = this.retrieveAccessToken.bind(this);
    }

    exchangePublicToken(req: express.Request, res: express.Response) {
        const { publicToken } = req.body;
        this.plaidClient.exchangePublicToken(publicToken, (error, response) => {
            if (error) {
                // handle errors
            }
            const accessToken = response.access_token;
            // Save this accessToken to user database
        });
    }

    retrieveAccessToken(user: string): string { // Will need to fetch access token from db
        if (this.accessTokenStore[user]) { // likely will do a DB lookup
            return this.accessTokenStore[user];
        }

        return '';
    }
}

module.exports = AuthenticationController;