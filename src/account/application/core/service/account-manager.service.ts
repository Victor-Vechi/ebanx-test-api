import { Inject, Injectable } from '@nestjs/common';
import { AccountNotFoundException } from 'src/account/domain/core/exception/account-not-found.exception';
import type { AccountRepositoryInterface } from 'src/account/domain/core/repository/account-repository.interface';
import { AccountManagerInterface } from 'src/account/domain/core/service/account-manager.interface';
import { DependencyInjectionEnum } from 'src/shared/domain/dependency-injection/dependency-injection.enum';

@Injectable()
export class AccountManagerService implements AccountManagerInterface {
  constructor(
    @Inject(DependencyInjectionEnum.ACCOUNT_REPOSITORY)
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}

  async accountBalance(accountId: string): Promise<number> {
    const account = await this.accountRepository.findById(accountId);

    if (!account) {
      throw new AccountNotFoundException(accountId);
    }

    return account.balance;
  }

  async resetTable(): Promise<void> {
    await this.accountRepository.resetTable();
  }
}
