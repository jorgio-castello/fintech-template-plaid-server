import express = require('express');
import plaid from 'plaid';

interface accessTokenStore { // this will eventually need to be abstracted to database
    [key:string]: string,
}

class AuthenticationController {
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

    retrieveAccessToken(req: express.Request, res: express.Response): void { // Will need to fetch access token from db
        const { user } = req.body;

        if (this.accessTokenStore[user]) {
            res.json({accessToken: this.accessTokenStore[user]});
            return;
        }

        res.json({error: 'User not found'});
    }
}

module.exports = AuthenticationController;