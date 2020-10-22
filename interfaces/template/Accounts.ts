import Balances from "./Balances";

export default interface Accounts {
    id: string,
    balances: Balances,
    previewAccountNumber: string | null,
    accountName: string,
    accountType: string,
}