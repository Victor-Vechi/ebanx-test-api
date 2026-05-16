import { Inject, Injectable } from "@nestjs/common";
import { DepositUseCaseInterface } from "src/account/domain/core/action/deposit-use-case.interface";
import type { DepositAdapterInterface } from "src/account/domain/core/adapter/deposit-adapter.interface";
import { EventDto } from "src/account/domain/core/dto/event.dto";
import { DepositResponseInterface } from "src/account/domain/core/event/deposit-response.interface";
import type { AccountRepositoryInterface } from "src/account/domain/core/repository/account-repository.interface";
import type { AccountTransactionInterface } from "src/account/domain/core/service/account-transaction.interface";
import type { DepositValidatorInterface } from "src/account/domain/core/validator/deposit-validator.interface";
import { DependencyInjectionEnum } from "src/shared/domain/dependency-injection/dependency-injection.enum";

@Injectable()
export class DepositUseCase implements DepositUseCaseInterface {
    constructor(
        @Inject(DependencyInjectionEnum.ACCOUNT_TRANSACTION) private readonly accountTransaction: AccountTransactionInterface,
        @Inject(DependencyInjectionEnum.DEPOSIT_ADAPTER) private readonly depositAdapter: DepositAdapterInterface,
        @Inject(DependencyInjectionEnum.ACCOUNT_REPOSITORY) private readonly accountRepository: AccountRepositoryInterface,
        @Inject(DependencyInjectionEnum.DEPOSIT_VALIDATOR) private readonly depositValidator: DepositValidatorInterface,
    ) {}

    async execute(event: EventDto): Promise<DepositResponseInterface> {

        this.depositValidator.execute(event);
        let account = await this.accountRepository.findById(event.destination!);

        if (!account) {
            account = {
                id: event.destination!,
                balance: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            await this.accountRepository.save([account]);
        }

        account = this.accountTransaction.deposit(account, event.amount);

        await this.accountRepository.save([account]);
        return this.depositAdapter.adapt(account);
    }
}