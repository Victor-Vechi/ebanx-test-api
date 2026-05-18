import { Injectable } from '@nestjs/common';
import { Account } from 'generated/prisma/client';
import { AccountTransactionInterface } from 'src/account/domain/core/contract/account-transaction.interface';
import { InsufficientFundsException } from '../exception/insufficient-funds.exception';


@Injectable()
export class AccountTransactionService implements AccountTransactionInterface {

  deposit(account: Account, amount: number): Account {

    account.balance += amount;
    account.updatedAt = new Date();

    return account;
  }

  withdraw(account: Account, amount: number): Account {
    if (account.balance < amount) {
      throw new InsufficientFundsException(account.id);
    }
    account.balance -= amount;
    account.updatedAt = new Date();

    return account;
  }

  transfer(originAccount: Account, destinationAccount: Account, amount: number): Account[] {
    
    originAccount = this.withdraw(originAccount, amount);
    destinationAccount = this.deposit(destinationAccount, amount);

    return [originAccount, destinationAccount];
  }
}
