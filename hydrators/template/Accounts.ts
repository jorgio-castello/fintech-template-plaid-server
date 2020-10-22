import plaid from 'plaid';
import TemplateAccountsInterface from '../../interfaces/template/Accounts';

const TemplateAccountsHydrator = (accountsData: plaid.AccountsResponse): TemplateAccountsInterface[] => {
    return accountsData.accounts.map((account: plaid.Account) => {
        return {
            id: account.account_id,
            balances: {
                available: account.balances.available,
                current: account.balances.current,
                currencyCode: account.balances.iso_currency_code,
            },
            previewAccountNumber: account.mask,
            accountName: account.name,
            accountType: account.type,
        }
    });
}

module.exports = TemplateAccountsHydrator;