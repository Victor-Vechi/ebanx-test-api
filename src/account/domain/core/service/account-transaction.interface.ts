import { Account } from "generated/prisma/client";


export interface AccountTransactionInterface {
    deposit(account: Account, amount: number): Account;
    withdraw(account: Account, amount: number): Account;
}