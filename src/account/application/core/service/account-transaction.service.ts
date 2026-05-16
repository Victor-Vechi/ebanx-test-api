import { Injectable } from '@nestjs/common';
import { Account } from 'generated/prisma/client';
import { AccountTransactionInterface } from 'src/account/domain/core/service/account-transaction.interface';


@Injectable()
export class AccountTransactionService implements AccountTransactionInterface {

    deposit(account: Account, amount: number): Account {
        account.balance += amount;
        account.updatedAt = new Date();

        return account;
    }

    withdraw(account: Account, amount: number): Account {
        account.balance -= amount;
        account.updatedAt = new Date();

        return account;
    }
}