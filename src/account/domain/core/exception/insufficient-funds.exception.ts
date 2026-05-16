

export class InsufficientFundsException extends Error {
    constructor(accountId: string) {
        super(`Insufficient funds in account: ${accountId}`);
        this.name = 'InsufficientFundsException';
    }
}