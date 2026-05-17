import { Inject, Injectable } from '@nestjs/common';
import { WithdrawUseCaseInterface } from 'src/account/domain/core/action/withdraw-use-case.interface';
import type { WithdrawAdapterInterface } from 'src/account/domain/core/adapter/withdraw-adapter.interface';
import { EventDto } from 'src/account/domain/core/dto/event.dto';
import { WithdrawResponseInterface } from 'src/account/domain/core/event/withdraw-response.interface';
import { AccountNotFoundException } from 'src/account/domain/core/exception/account-not-found.exception';
import { InsufficientFundsException } from 'src/account/domain/core/exception/insufficient-funds.exception';
import type { AccountRepositoryInterface } from 'src/account/domain/core/repository/account-repository.interface';
import type { AccountTransactionInterface } from 'src/account/domain/core/service/account-transaction.interface';
import type { WithdrawValidatorInterface } from 'src/account/domain/core/validator/withdraw-validator.interface';
import { DependencyInjectionEnum } from 'src/shared/domain/dependency-injection/dependency-injection.enum';

@Injectable()
export class WithdrawUseCase implements WithdrawUseCaseInterface {
  constructor(
    @Inject(DependencyInjectionEnum.ACCOUNT_TRANSACTION)
    private readonly accountTransaction: AccountTransactionInterface,
    @Inject(DependencyInjectionEnum.WITHDRAW_ADAPTER)
    private readonly withdrawAdapter: WithdrawAdapterInterface,
    @Inject(DependencyInjectionEnum.ACCOUNT_REPOSITORY)
    private readonly accountRepository: AccountRepositoryInterface,
    @Inject(DependencyInjectionEnum.WITHDRAW_VALIDATOR)
    private readonly withdrawValidator: WithdrawValidatorInterface,
  ) {}

  async execute(event: EventDto): Promise<WithdrawResponseInterface> {
    this.withdrawValidator.execute(event);
    let account = await this.accountRepository.findById(event.origin!);

    if (!account) {
      throw new AccountNotFoundException(event.origin!);
    }

    if (account.balance < event.amount) {
      throw new InsufficientFundsException(account.id);
    }

    account = this.accountTransaction.withdraw(account, event.amount);

    await this.accountRepository.save(account);

    return this.withdrawAdapter.adapt(account);
  }
}
