import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AccountController } from './infrastructure/core/http/v1/controller/event.controller';
import { DependencyInjectionEnum } from 'src/shared/domain/dependency-injection/dependency-injection.enum';
import { EventManagerService } from './application/core/service/event-manager.service';
import { DepositAdapter } from './application/core/adapter/deposit.adapter';
import { AccountRepository } from './infrastructure/core/persistence/repository/account.repository';
import { DepositValidator } from './application/core/validator/deposit.validator';
import { AccountTransactionService } from './domain/core/service/account-transaction.service';
import { WithdrawAdapter } from './application/core/adapter/withdraw.adapter';
import { WithdrawValidator } from './application/core/validator/withdraw.validator';
import { TransferValidator } from './application/core/validator/transfer.validator';
import { TransferAdapter } from './application/core/adapter/transfer.adapter';
import { AccountManagerService } from './domain/core/service/account-manager.service';
import { BalanceQueryService } from './application/core/service/balance-query.service';
import { DepositUseCase } from './application/core/use-case/deposit.use-case';
import { WithdrawUseCase } from './application/core/use-case/withdraw.use-case';
import { TransferUseCase } from './application/core/use-case/transfer.use-case';

@Module({
  imports: [SharedModule],
  controllers: [AccountController],
  providers: [
    {
      provide: DependencyInjectionEnum.EVENT_MANAGER,
      useClass: EventManagerService,
    },
    {
      provide: DependencyInjectionEnum.ACCOUNT_TRANSACTION,
      useClass: AccountTransactionService,
    },
    {
      provide: DependencyInjectionEnum.ACCOUNT_REPOSITORY,
      useClass: AccountRepository,
    },
    {
      provide: DependencyInjectionEnum.DEPOSIT_VALIDATOR,
      useClass: DepositValidator,
    },
    {
      provide: DependencyInjectionEnum.DEPOSIT_CASE,
      useClass: DepositUseCase,
    },
    {
      provide: DependencyInjectionEnum.DEPOSIT_ADAPTER,
      useClass: DepositAdapter,
    },
    {
      provide: DependencyInjectionEnum.WITHDRAW_CASE,
      useClass: WithdrawUseCase,
    },
    {
      provide: DependencyInjectionEnum.WITHDRAW_ADAPTER,
      useClass: WithdrawAdapter,
    },
    {
      provide: DependencyInjectionEnum.WITHDRAW_VALIDATOR,
      useClass: WithdrawValidator,
    },
    {
      provide: DependencyInjectionEnum.TRANSFER_CASE,
      useClass: TransferUseCase,
    },
    {
      provide: DependencyInjectionEnum.TRANSFER_VALIDATOR,
      useClass: TransferValidator,
    },
    {
      provide: DependencyInjectionEnum.TRANSFER_ADAPTER,
      useClass: TransferAdapter,
    },
    {
      provide: DependencyInjectionEnum.ACCOUNT_MANAGER,
      useClass: AccountManagerService,
    },
    {
      provide: DependencyInjectionEnum.BALANCE_QUERY,
      useClass: BalanceQueryService,
    },
  ],
})
export class AccountModule {}
