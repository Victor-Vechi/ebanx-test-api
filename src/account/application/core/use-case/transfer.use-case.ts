import { Inject, Injectable } from '@nestjs/common';
import { TransferUseCaseInterface } from 'src/account/domain/core/use-case/transfer-use-case.interface';
import type { TransferAdapterInterface } from 'src/account/domain/core/adapter/transfer-adapter.interface';
import { EventDto } from 'src/account/domain/core/dto/request/event.dto';
import { AccountNotFoundException } from 'src/account/domain/core/exception/account-not-found.exception';
import type { AccountTransactionInterface } from 'src/account/domain/core/contract/account-transaction.interface';
import type { TransferValidatorInterface } from 'src/account/domain/core/validator/transfer-validator.interface';
import { DependencyInjectionEnum } from 'src/shared/domain/dependency-injection/dependency-injection.enum';
import type { AccountManagerInterface } from 'src/account/domain/core/contract/account-manager.interface';
import { TransferResponseDto } from 'src/account/domain/core/dto/response/transfer-response.dto';

@Injectable()
export class TransferUseCase implements TransferUseCaseInterface {
  constructor(
    @Inject(DependencyInjectionEnum.ACCOUNT_TRANSACTION)
    private readonly accountTransaction: AccountTransactionInterface,
    @Inject(DependencyInjectionEnum.TRANSFER_ADAPTER)
    private readonly transferAdapter: TransferAdapterInterface,
    @Inject(DependencyInjectionEnum.ACCOUNT_MANAGER)
    private readonly accountManager: AccountManagerInterface,
    @Inject(DependencyInjectionEnum.TRANSFER_VALIDATOR)
    private readonly transferValidator: TransferValidatorInterface,
  ) {}
  async execute(event: EventDto): Promise<TransferResponseDto> {
    this.transferValidator.execute(event);

    let originAccount = await this.accountManager.getAccount(event.origin!);
    if (!originAccount) {
      throw new AccountNotFoundException(event.origin!);
    }

    let destinationAccount = await this.accountManager.getDestinationAccount(
      event.destination!,
    );

    [originAccount, destinationAccount] = this.accountTransaction.transfer(
      originAccount,
      destinationAccount,
      event.amount,
    );

    await this.accountManager.saveTransaction([
      originAccount,
      destinationAccount,
    ]);

    return this.transferAdapter.adapt(originAccount, destinationAccount);
  }
}
