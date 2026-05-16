import { AccountTransactionService } from "src/account/application/core/service/account-transaction.service";
import { AccountRepositoryInterface } from "src/account/domain/core/repository/account-repository.interface";
import { AccountTransactionInterface } from "src/account/domain/core/service/account-transaction.interface";
import { EventDto } from "src/account/domain/core/dto/event.dto";
import { Account } from "generated/prisma/client";
import { TransferUseCaseInterface } from "src/account/domain/core/action/transfer-use-case.interface";
import { TransferAdapterInterface } from "src/account/domain/core/adapter/transfer-adapter.interface";
import { TransferValidatorInterface } from "src/account/domain/core/validator/transfer-validator.interface";
import { TransferAdapter } from "src/account/application/core/adapter/transfer.adapter";
import { TransferValidator } from "src/account/application/core/validator/transfer.validator";
import { TransferUseCase } from "src/account/application/core/use-cases/transfer.use-case";


describe('TransferUseCase', () => { 

    let transferUseCase: TransferUseCaseInterface;
    let accountTransactionService: AccountTransactionInterface;
    let transferAdapter: TransferAdapterInterface;
    let accountRepository: AccountRepositoryInterface;
    let transferValidator: TransferValidatorInterface;

    beforeEach(() => {
        accountTransactionService = new AccountTransactionService();
        transferAdapter = new TransferAdapter();
        transferValidator = new TransferValidator();
        accountRepository = {
            findById: jest.fn(),
            saveAll: jest.fn(),
            save: jest.fn(),
            resetTable: jest.fn(),
        };


        transferUseCase = new TransferUseCase(
            accountTransactionService,
            transferAdapter,
            accountRepository,
            transferValidator,
        );
    });


    it('Should execute transfer use case', async () => {
        const event: EventDto = {
            type: 'transfer',
            origin: '1',
            destination: '2',
            amount: 100,
        };
        const originAccount:Account = {
            id: "1",
            balance: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const destinationAccount:Account = {
            id: "2",
            balance: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
         };

        (accountRepository.findById as jest.Mock).mockResolvedValueOnce(originAccount).mockResolvedValueOnce(destinationAccount);

        const expectedResponse = {
            origin: {
                id: "1",
                balance: 0,
            },
            destination: {
                id: "2",
                balance: 100,
            }
        };

        const response = await transferUseCase.execute(event);


        expect(response).toEqual(expectedResponse);

        expect(accountRepository.findById).toHaveBeenCalledWith(event.origin);
    })


    it('Should execute transfer use case with no existing destination account', async () => {
        const event: EventDto = {
            type: 'transfer',
            origin: '1',
            destination: '2',
            amount: 100,
        };
        const originAccount:Account = {
            id: "1",
            balance: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        (accountRepository.findById as jest.Mock).mockResolvedValueOnce(originAccount).mockResolvedValueOnce(null);
        (accountRepository.save as jest.Mock).mockResolvedValue({
            id: event.destination,
            balance: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const expectedResponse = {
            origin: {
                id: "1",
                balance: 0,
            },
            destination: {
                id: "2",
                balance: 100,
            }
        };

        const response = await transferUseCase.execute(event);


        expect(response).toEqual(expectedResponse);

        expect(accountRepository.findById).toHaveBeenCalledWith(event.origin);
    })

    it('Should throw an error if account does not have enough balance', async () => {
        const event: EventDto = {
            type: 'transfer',
            origin: '1',
            destination: '2',
            amount: 100,
        };
        const account:Account = {
            id: "1",
            balance: 50,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        (accountRepository.findById as jest.Mock).mockResolvedValue(account);

        await expect(transferUseCase.execute(event)).rejects.toThrow('Insufficient funds in account: 1');

        expect(accountRepository.findById).toHaveBeenCalledWith(event.origin);
    })

    it('Should throw an error if account not found', async () => {
        const event: EventDto = {
            type: 'transfer',
            origin: '1',
            destination: '2',
            amount: 100,
        };
        (accountRepository.findById as jest.Mock).mockResolvedValue(null);

        await expect(transferUseCase.execute(event)).rejects.toThrow('Origin account not found: 1');

        expect(accountRepository.findById).toHaveBeenCalledWith(event.origin);
    })
})