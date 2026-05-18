import { Account } from 'generated/prisma/client';
import { AccountTransactionService } from 'src/account/domain/core/service/account-transaction.service';
import { AccountTransactionInterface } from 'src/account/domain/core/contract/account-transaction.interface';

describe('AccountTransactionService', () => {
  let accountTransactionService: AccountTransactionInterface;

  beforeEach(() => {
    accountTransactionService = new AccountTransactionService();
  });

  it('Should perform deposit transaction', () => {
    const sourceAccount: Account = {
      id: '1',
      balance: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    accountTransactionService.deposit(sourceAccount, 50);
    expect(sourceAccount.balance).toBe(150);
  });

  it('Should perform deposit transaction', () => {
    const sourceAccount: Account = {
      id: '1',
      balance: 123,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    accountTransactionService.deposit(sourceAccount, 390);
    expect(sourceAccount.balance).toBe(513);
  });

  it('Should perform withdraw transaction', () => {
    const sourceAccount: Account = {
      id: '1',
      balance: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    accountTransactionService.withdraw(sourceAccount, 50);
    expect(sourceAccount.balance).toBe(50);
  });

  it('Should perform withdraw transaction', () => {
    const sourceAccount: Account = {
      id: '1',
      balance: 123,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    accountTransactionService.withdraw(sourceAccount, 89);
    expect(sourceAccount.balance).toBe(34);
  });
});
