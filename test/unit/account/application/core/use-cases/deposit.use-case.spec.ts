import { DepositAdapter } from 'src/account/application/core/adapter/deposit.adapter';
import { AccountTransactionService } from 'src/account/domain/core/service/account-transaction.service';
import { DepositUseCase } from 'src/account/application/core/use-cases/deposit.use-case';
import { DepositUseCaseInterface } from 'src/account/domain/core/action/deposit-use-case.interface';
import { DepositAdapterInterface } from 'src/account/domain/core/adapter/deposit-adapter.interface';
import { AccountRepositoryInterface } from 'src/account/domain/core/repository/account-repository.interface';
import { AccountTransactionInterface } from 'src/account/domain/core/contract/account-transaction.interface';
import { DepositValidatorInterface } from 'src/account/domain/core/validator/deposit-validator.interface';
import { EventDto } from 'src/account/domain/core/dto/request/event.dto';
import { Account } from 'generated/prisma/client';
import { DepositValidator } from 'src/account/application/core/validator/deposit.validator';
import { AccountManagerInterface } from 'src/account/domain/core/contract/account-manager.interface';

describe('DepositUseCase', () => {
  let depositUseCase: DepositUseCaseInterface;
  let accountTransactionService: AccountTransactionInterface;
  let depositAdapter: DepositAdapterInterface;
  let accountManager: AccountManagerInterface;
  let depositValidator: DepositValidatorInterface;

  beforeEach(() => {
    accountTransactionService = new AccountTransactionService();
    depositAdapter = new DepositAdapter();
    depositValidator = new DepositValidator();
    accountManager = {
      getDestinationAccount: jest.fn(),
      saveAccount: jest.fn(),
      getAccount: jest.fn(),
      saveTransaction: jest.fn(),
      resetTable: jest.fn(),
    };

    depositUseCase = new DepositUseCase(
      accountTransactionService,
      accountManager,
      depositAdapter,
      depositValidator,
    );
  });

  it('Should execute deposit use case', async () => {
    const event: EventDto = {
      type: 'deposit',
      destination: '1',
      amount: 100,
    };
    const account: Account = {
      id: '1',
      balance: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (accountManager.getDestinationAccount as jest.Mock).mockResolvedValue(account);

    const expectedResponse = {
      destination: {
        id: '1',
        balance: 200,
      },
    };

    const response = await depositUseCase.execute(event);

    expect(response).toEqual(expectedResponse);

    expect(accountManager.getDestinationAccount).toHaveBeenCalledWith(event.destination);
  });

  it('Should execute deposit use case with new account', async () => {
    const event: EventDto = {
      type: 'deposit',
      destination: '1',
      amount: 100,
    };
    (accountManager.getDestinationAccount as jest.Mock).mockResolvedValue(
      {
        id: event.destination,
        balance: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );
    const expectedResponse = {
      destination: {
        id: '1',
        balance: 100,
      },
    };
    const response = await depositUseCase.execute(event);
    expect(response).toEqual(expectedResponse);

    expect(accountManager.getDestinationAccount).toHaveBeenCalledWith(event.destination);
  });
});
