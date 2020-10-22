import plaid from 'plaid';
import TemplateTransactionsInterface from '../../interfaces/template/Transactions';

const TemplateTransactionsHydrator = (transactionsData: plaid.TransactionsResponse): TemplateTransactionsInterface[] => {
    return transactionsData.transactions.map((transaction: plaid.Transaction) => {
        return {
            transactionId: transaction.transaction_id,
            accountId: transaction.account_id,
            amount: transaction.amount,
            currency: transaction.iso_currency_code,
            category: transaction.category,
            date: transaction.date,
            location: {
                city: transaction.location.city,
                region: transaction.location.region,
                country: transaction.location.country,
                postalCode: transaction.location.postal_code,
            },
            merchant: transaction.name,
            merchantName: transaction.merchant_name,
            paymentMetaData: {
                method: transaction.payment_meta.payment_method,
                processor: transaction.payment_meta.payment_processor,
            }
        }
    });
};

module.exports = TemplateTransactionsHydrator;