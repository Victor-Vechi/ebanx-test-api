import { Inject, Injectable } from '@nestjs/common';
import { DepositUseCaseInterface } from 'src/account/domain/core/use-case/deposit-use-case.interface';
import type { DepositAdapterInterface } from 'src/account/domain/core/adapter/deposit-adapter.interface';
import { EventDto } from 'src/account/domain/core/dto/request/event.dto';
import type { AccountTransactionInterface } from 'src/account/domain/core/contract/account-transaction.interface';
import type { DepositValidatorInterface } from 'src/account/domain/core/validator/deposit-validator.interface';
import { DependencyInjectionEnum } from 'src/shared/domain/dependency-injection/dependency-injection.enum';
import type { AccountManagerInterface } from 'src/account/domain/core/contract/account-manager.interface';
import { DepositResponseDto } from 'src/account/domain/core/dto/response/deposit-response.dto';

@Injectable()
export class DepositUseCase implements DepositUseCaseInterface {
  constructor(
    @Inject(DependencyInjectionEnum.ACCOUNT_TRANSACTION)
    private readonly accountTransaction: AccountTransactionInterface,
    @Inject(DependencyInjectionEnum.ACCOUNT_MANAGER)
    private readonly accountManager: AccountManagerInterface,
    @Inject(DependencyInjectionEnum.DEPOSIT_ADAPTER)
    private readonly depositAdapter: DepositAdapterInterface,
    @Inject(DependencyInjectionEnum.DEPOSIT_VALIDATOR)
    private readonly depositValidator: DepositValidatorInterface,
  ) {}

  async execute(event: EventDto): Promise<DepositResponseDto> {
    this.depositValidator.execute(event);
    let account = await this.accountManager.getDestinationAccount(
      event.destination!,
    );

    account = this.accountTransaction.deposit(account, event.amount);

    await this.accountManager.saveAccount(account);
    return this.depositAdapter.adapt(account);
  }
}
