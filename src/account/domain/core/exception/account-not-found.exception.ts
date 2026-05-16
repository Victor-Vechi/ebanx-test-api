

export class AccountNotFoundException extends Error {
    constructor(accountId: string) {
        super(`Origin account not found: ${accountId}`);
        this.name = 'AccountNotFoundException';
    }
}