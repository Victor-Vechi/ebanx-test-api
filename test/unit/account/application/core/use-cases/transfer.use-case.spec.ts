import { AccountTransactionService } from 'src/account/domain/core/service/account-transaction.service';
import { AccountTransactionInterface } from 'src/account/domain/core/contract/account-transaction.interface';
import { EventDto } from 'src/account/domain/core/dto/request/event.dto';
import { Account } from 'generated/prisma/client';
import { TransferUseCaseInterface } from 'src/account/domain/core/use-case/transfer-use-case.interface';
import { TransferAdapterInterface } from 'src/account/domain/core/adapter/transfer-adapter.interface';
import { TransferValidatorInterface } from 'src/account/domain/core/validator/transfer-validator.interface';
import { TransferAdapter } from 'src/account/application/core/adapter/transfer.adapter';
import { TransferValidator } from 'src/account/application/core/validator/transfer.validator';
import { TransferUseCase } from 'src/account/application/core/use-cases/transfer.use-case';
import { AccountManagerInterface } from 'src/account/domain/core/contract/account-manager.interface';

describe('TransferUseCase', () => {
  let transferUseCase: TransferUseCaseInterface;
  let accountTransactionService: AccountTransactionInterface;
  let transferAdapter: TransferAdapterInterface;
  let accountManager: AccountManagerInterface;
  let transferValidator: TransferValidatorInterface;

  beforeEach(() => {
    accountTransactionService = new AccountTransactionService();
    transferAdapter = new TransferAdapter();
    transferValidator = new TransferValidator();
    accountManager = {
      getDestinationAccount: jest.fn(),
      saveAccount: jest.fn(),
      getAccount: jest.fn(),
      saveTransaction: jest.fn(),
      resetTable: jest.fn(),
    };

    transferUseCase = new TransferUseCase(
      accountTransactionService,
      transferAdapter,
      accountManager,
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
    const originAccount: Account = {
      id: '1',
      balance: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const destinationAccount: Account = {
      id: '2',
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    accountManager.getAccount = jest.fn().mockResolvedValueOnce(originAccount);
    accountManager.getDestinationAccount = jest.fn().mockResolvedValueOnce(destinationAccount);

    const expectedResponse = {
      origin: {
        id: '1',
        balance: 0,
      },
      destination: {
        id: '2',
        balance: 100,
      },
    };

    const response = await transferUseCase.execute(event);

    expect(response).toEqual(expectedResponse);

    expect(accountManager.getAccount).toHaveBeenCalledWith(event.origin);
  });

  it('Should execute transfer use case with no existing destination account', async () => {
    const event: EventDto = {
      type: 'transfer',
      origin: '1',
      destination: '2',
      amount: 100,
    };
    const originAccount: Account = {
      id: '1',
      balance: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    accountManager.getAccount = jest.fn().mockResolvedValueOnce(originAccount);
    accountManager.getDestinationAccount = jest.fn().mockResolvedValueOnce(
      {
        id: event.destination,
        balance: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );
    
    (accountManager.saveAccount as jest.Mock).mockResolvedValue({
      id: event.destination,
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const expectedResponse = {
      origin: {
        id: '1',
        balance: 0,
      },
      destination: {
        id: '2',
        balance: 100,
      },
    };

    const response = await transferUseCase.execute(event);

    expect(response).toEqual(expectedResponse);

    expect(accountManager.getAccount).toHaveBeenCalledWith(event.origin);
  });

  it('Should throw an error if account does not have enough balance', async () => {
    const event: EventDto = {
      type: 'transfer',
      origin: '1',
      destination: '2',
      amount: 100,
    };
    const account: Account = {
      id: '1',
      balance: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (accountManager.getAccount as jest.Mock).mockResolvedValue(account);

    await expect(transferUseCase.execute(event)).rejects.toThrow(
      'Insufficient funds in account: 1',
    );

    expect(accountManager.getAccount).toHaveBeenCalledWith(event.origin);
  });

  it('Should throw an error if account not found', async () => {
    const event: EventDto = {
      type: 'transfer',
      origin: '1',
      destination: '2',
      amount: 100,
    };
    (accountManager.getAccount as jest.Mock).mockResolvedValue(null);

    await expect(transferUseCase.execute(event)).rejects.toThrow(
      'Origin account not found: 1',
    );

    expect(accountManager.getAccount).toHaveBeenCalledWith(event.origin);
  });
});
