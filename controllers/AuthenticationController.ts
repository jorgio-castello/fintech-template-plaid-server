import express = require('express');
import plaid from 'plaid';


export default class AuthenticationController {
    plaidClient: plaid.Client;
    
    constructor(plaidClient: plaid.Client) {
        this.plaidClient = plaidClient;

        this.exchangePublicToken = this.exchangePublicToken.bind(this);
    }

    exchangePublicToken(req: express.Request, res: express.Response) {
        const { publicToken } = req.body;
        this.plaidClient.exchangePublicToken(publicToken, (error, response) => {
            if (error) {
                // handle errors
                throw new Error();
            }
            res.json({ accessToken: response.access_token });
        });
    }
}

module.exports = AuthenticationController;