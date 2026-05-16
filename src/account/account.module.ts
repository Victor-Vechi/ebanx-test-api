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
        }
    ],
})
export class AccountModule { }
