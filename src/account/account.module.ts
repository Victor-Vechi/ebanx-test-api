import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AccountController } from './infrastructure/core/http/v1/controller/event.controller';
import { DependencyInjectionEnum } from 'src/shared/domain/dependency-injection/dependency-injection.enum';
import { EventHandler } from './application/core/handler/event.handler';
import { DepositUseCase } from './application/core/use-cases/deposit.use-case';
import { DepositAdapter } from './application/core/adapter/deposit.adapter';
import { AccountRepository } from './infrastructure/core/persistence/repository/account.repository';
import { DepositValidator } from './application/core/validator/deposit.validator';
import { AccountTransactionService } from './application/core/service/account-transaction.service';
import { WithdrawUseCase } from './application/core/use-cases/withdraw.use-case';
import { WithdrawAdapter } from './application/core/adapter/withdraw.adapter';
import { WithdrawValidator } from './application/core/validator/withdraw.validator';


@Module({
    imports: [SharedModule],
    controllers: [AccountController],
    providers: [
        {
            provide: DependencyInjectionEnum.EVENT_HANDLER,
            useClass: EventHandler,
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
        }
    ],
})
export class AccountModule { }
