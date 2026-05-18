import { Inject, Injectable } from '@nestjs/common';
import { WithdrawUseCaseInterface } from 'src/account/domain/core/use-case/withdraw-use-case.interface';
import type { WithdrawAdapterInterface } from 'src/account/domain/core/adapter/withdraw-adapter.interface';
import { EventDto } from 'src/account/domain/core/dto/request/event.dto';
import { AccountNotFoundException } from 'src/account/domain/core/exception/account-not-found.exception';
import type { AccountRepositoryInterface } from 'src/account/domain/core/repository/account-repository.interface';
import type { AccountTransactionInterface } from 'src/account/domain/core/contract/account-transaction.interface';
import type { WithdrawValidatorInterface } from 'src/account/domain/core/validator/withdraw-validator.interface';
import { DependencyInjectionEnum } from 'src/shared/domain/dependency-injection/dependency-injection.enum';
import { WithdrawResponseDto } from 'src/account/domain/core/dto/response/withdraw-response.dto';
import type { AccountManagerInterface } from 'src/account/domain/core/contract/account-manager.interface';

@Injectable()
export class WithdrawUseCase implements WithdrawUseCaseInterface {
  constructor(
    @Inject(DependencyInjectionEnum.ACCOUNT_TRANSACTION)
    private readonly accountTransaction: AccountTransactionInterface,
    @Inject(DependencyInjectionEnum.WITHDRAW_ADAPTER)
    private readonly withdrawAdapter: WithdrawAdapterInterface,
    @Inject(DependencyInjectionEnum.ACCOUNT_MANAGER)
    private readonly accountManager: AccountManagerInterface,
    @Inject(DependencyInjectionEnum.WITHDRAW_VALIDATOR)
    private readonly withdrawValidator: WithdrawValidatorInterface,
  ) {}

  async execute(event: EventDto): Promise<WithdrawResponseDto> {
    this.withdrawValidator.execute(event);
    let account = await this.accountManager.getAccount(event.origin!);

    if (!account) {
      throw new AccountNotFoundException(event.origin!);
    }

    account = this.accountTransaction.withdraw(account, event.amount);

    await this.accountManager.saveAccount(account);

    return this.withdrawAdapter.adapt(account);
  }
}
