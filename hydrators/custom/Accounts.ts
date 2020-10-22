import plaid from 'plaid';
import CustomAccountsInterface from '../../interfaces/custom/Accounts';

const CustomAccountsHydrator = (accountsData: plaid.AccountsResponse): CustomAccountsInterface[] => {
    return accountsData.accounts.map((account: plaid.Account) => {
        return {}
    })
}

module.exports = CustomAccountsHydrator;