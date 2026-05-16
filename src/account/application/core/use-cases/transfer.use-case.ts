import { Inject, Injectable } from "@nestjs/common";
import { Account } from "generated/prisma/client";
import { AccountModel } from "generated/prisma/models";
import { TransferUseCaseInterface } from "src/account/domain/core/action/transfer-use-case.interface";
import type { TransferAdapterInterface } from "src/account/domain/core/adapter/transfer-adapter.interface";
import { EventDto } from "src/account/domain/core/dto/event.dto";
import { TransferResponseInterface } from "src/account/domain/core/event/transfer-response.interface";
import type { AccountRepositoryInterface } from "src/account/domain/core/repository/account-repository.interface";
import type { AccountTransactionInterface } from "src/account/domain/core/service/account-transaction.interface";
import type { TransferValidatorInterface } from "src/account/domain/core/validator/transfer-validator.interface";
import { DependencyInjectionEnum } from "src/shared/domain/dependency-injection/dependency-injection.enum";



@Injectable()
export class TransferUseCase implements TransferUseCaseInterface {
    constructor(
        @Inject(DependencyInjectionEnum.ACCOUNT_TRANSACTION) private readonly accountTransaction: AccountTransactionInterface,
        @Inject(DependencyInjectionEnum.TRANSFER_ADAPTER) private readonly transferAdapter: TransferAdapterInterface,
        @Inject(DependencyInjectionEnum.ACCOUNT_REPOSITORY) private readonly accountRepository: AccountRepositoryInterface,
        @Inject(DependencyInjectionEnum.TRANSFER_VALIDATOR) private readonly transferValidator: TransferValidatorInterface
    ) { }
    async execute(event: EventDto): Promise<TransferResponseInterface> {
        this.transferValidator.execute(event);

        const originAccount = await this.transferFrom(event);
        const destinationAccount = await this.transferTo(event); 

        await this.accountRepository.saveAll([originAccount, destinationAccount]);

        return this.transferAdapter.adapt(originAccount, destinationAccount);
    }

    private async transferFrom(transferData: EventDto): Promise<Account> {
        let originAccount = await this.accountRepository.findById(transferData.origin!);
        if (!originAccount) {
            throw new Error("Origin account not found");
        }

        if (originAccount.balance < transferData.amount) {
            throw new Error("Insufficient funds");
        }
        
        return this.accountTransaction.withdraw(originAccount, transferData.amount);
    }

    private async transferTo(transferData: EventDto): Promise<Account> {
        let destinationAccount = await this.accountRepository.findById(transferData.destination!);

        if (!destinationAccount) {
            const newAccount: AccountModel = {
                id: transferData.destination!,
                balance: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            destinationAccount = await this.accountRepository.save(newAccount);
        }
        return this.accountTransaction.deposit(destinationAccount, transferData.amount);
    }
}