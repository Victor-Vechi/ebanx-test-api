import { Inject, Injectable } from '@nestjs/common';
import type { AccountRepositoryInterface } from 'src/account/domain/core/repository/account-repository.interface';
import { AccountManagerInterface } from 'src/account/domain/core/contract/account-manager.interface';
import { DependencyInjectionEnum } from 'src/shared/domain/dependency-injection/dependency-injection.enum';
import { AccountModel } from 'generated/prisma/models';

@Injectable()
export class AccountManagerService implements AccountManagerInterface {
  constructor(
    @Inject(DependencyInjectionEnum.ACCOUNT_REPOSITORY)
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}

  async getAccount(accountId: string): Promise<AccountModel | null> {
    const account = await this.accountRepository.findById(accountId);

    if (!account) {
      return null;
    }

    return account;
  }

  async getDestinationAccount(accountId: string): Promise<AccountModel> {
    let account = await this.getAccount(accountId);
    if (!account) {
      account = {
        id: accountId,
        balance: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    return account;
  }

  async saveAccount(account: AccountModel): Promise<void> {
    await this.accountRepository.save(account);
  }

  async saveTransaction(accounts: AccountModel[]): Promise<void> {
    await this.accountRepository.saveAll(accounts);
  }

  async resetTable(): Promise<void> {
    await this.accountRepository.resetTable();
  }
}
