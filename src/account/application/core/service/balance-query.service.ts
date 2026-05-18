import { Inject, Injectable } from "@nestjs/common";
import type { AccountManagerInterface } from "src/account/domain/core/contract/account-manager.interface";
import { BalanceQueryInterface } from "src/account/domain/core/contract/balance-query.interface";
import { AccountNotFoundException } from "src/account/domain/core/exception/account-not-found.exception";
import { DependencyInjectionEnum } from "src/shared/domain/dependency-injection/dependency-injection.enum";



@Injectable()
export class BalanceQueryService implements BalanceQueryInterface {
  constructor(
    @Inject(DependencyInjectionEnum.ACCOUNT_MANAGER)
    private readonly accountManagerService: AccountManagerInterface,
  ) {}

  async getAccountBalance(accountId: string): Promise<number> {
    const account = await this.accountManagerService.getAccount(accountId);

    if (!account) {
      throw new AccountNotFoundException(accountId);
    }

    return account.balance;
  }

  async reset(): Promise<void> {
    await this.accountManagerService.resetTable();
  }

}