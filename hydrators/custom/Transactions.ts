import plaid from 'plaid';
import CustomTransactionsInterface from '../../interfaces/custom/Transactions';

const CustomTransactionsHydrator = (transactionsData: plaid.TransactionsResponse): CustomTransactionsInterface[] => {
    return transactionsData.transactions.map((transaction: plaid.Transaction) => {
        return {};
    });
};

module.exports = CustomTransactionsHydrator;
