import { DepositAdapter } from "src/account/application/core/adapter/deposit.adapter";
import { AccountTransactionService } from "src/account/application/core/service/account-transaction.service";
import { DepositUseCase } from "src/account/application/core/use-cases/deposit.use-case";
import { DepositUseCaseInterface } from "src/account/domain/core/action/deposit-use-case.interface";
import { DepositAdapterInterface } from "src/account/domain/core/adapter/deposit-adapter.interface";
import { AccountRepositoryInterface } from "src/account/domain/core/repository/account-repository.interface";
import { AccountTransactionInterface } from "src/account/domain/core/service/account-transaction.interface";
import { DepositValidatorInterface } from "src/account/domain/core/validator/deposit-validator.interface";
import { EventDto } from "src/account/domain/core/dto/event.dto";
import { Account } from "generated/prisma/client";
import { DepositValidator } from "src/account/application/core/validator/deposit.validator";



describe('DepositUseCase', () => { 

    let depositUseCase: DepositUseCaseInterface;
    let accountTransactionService: AccountTransactionInterface;
    let depositAdapter: DepositAdapterInterface;
    let accountRepository: AccountRepositoryInterface;
    let depositValidator: DepositValidatorInterface;

    beforeEach(() => {

        accountTransactionService = new AccountTransactionService();
        depositAdapter = new DepositAdapter();
        depositValidator = new DepositValidator();
        accountRepository = {
            findById: jest.fn(),
            saveAll: jest.fn(),
            save: jest.fn(),
            resetTable: jest.fn(),
        };


        depositUseCase = new DepositUseCase(
            accountTransactionService,
            depositAdapter,
            accountRepository,
            depositValidator,
        );
    });


    it('Should execute deposit use case', async () => {
        const event: EventDto = {
            type: 'deposit',
            destination: '1',
            amount: 100,
        };
        const account:Account = {
            id: "1",
            balance: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        (accountRepository.findById as jest.Mock).mockResolvedValue(account);

        const expectedResponse = {
            destination: {
                id: "1",
                balance: 200,
            }
        };

        const response = await depositUseCase.execute(event);


        expect(response).toEqual(expectedResponse);

        expect(accountRepository.findById).toHaveBeenCalledWith(event.destination);
    })

    it('Should execute deposit use case with new account', async () => {
        const event: EventDto = {
            type: 'deposit',
            destination: '1',
            amount: 100,
        };
        (accountRepository.findById as jest.Mock).mockResolvedValue(null);
        const expectedResponse = {
            destination: {
                id: "1",
                balance: 100,
            }
        };
        const response = await depositUseCase.execute(event);
        expect(response).toEqual(expectedResponse);

        expect(accountRepository.findById).toHaveBeenCalledWith(event.destination);
    })
})