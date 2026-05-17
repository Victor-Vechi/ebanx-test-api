import { AccountTransactionService } from 'src/account/application/core/service/account-transaction.service';
import { AccountRepositoryInterface } from 'src/account/domain/core/repository/account-repository.interface';
import { AccountTransactionInterface } from 'src/account/domain/core/service/account-transaction.interface';
import { EventDto } from 'src/account/domain/core/dto/event.dto';
import { Account } from 'generated/prisma/client';
import { WithdrawAdapter } from 'src/account/application/core/adapter/withdraw.adapter';
import { WithdrawValidator } from 'src/account/application/core/validator/withdraw.validator';
import { WithdrawUseCase } from 'src/account/application/core/use-cases/withdraw.use-case';
import { WithdrawUseCaseInterface } from 'src/account/domain/core/action/withdraw-use-case.interface';
import { WithdrawAdapterInterface } from 'src/account/domain/core/adapter/withdraw-adapter.interface';
import { WithdrawValidatorInterface } from 'src/account/domain/core/validator/withdraw-validator.interface';

describe('WithdrawUseCase', () => {
  let withdrawUseCase: WithdrawUseCaseInterface;
  let accountTransactionService: AccountTransactionInterface;
  let withdrawAdapter: WithdrawAdapterInterface;
  let accountRepository: AccountRepositoryInterface;
  let withdrawValidator: WithdrawValidatorInterface;

  beforeEach(() => {
    accountTransactionService = new AccountTransactionService();
    withdrawAdapter = new WithdrawAdapter();
    withdrawValidator = new WithdrawValidator();
    accountRepository = {
      findById: jest.fn(),
      saveAll: jest.fn(),
      save: jest.fn(),
      resetTable: jest.fn(),
    };

    withdrawUseCase = new WithdrawUseCase(
      accountTransactionService,
      withdrawAdapter,
      accountRepository,
      withdrawValidator,
    );
  });

  it('Should execute withdraw use case', async () => {
    const event: EventDto = {
      type: 'withdraw',
      origin: '1',
      amount: 100,
    };
    const account: Account = {
      id: '1',
      balance: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (accountRepository.findById as jest.Mock).mockResolvedValue(account);

    const expectedResponse = {
      origin: {
        id: '1',
        balance: 0,
      },
    };

    const response = await withdrawUseCase.execute(event);

    expect(response).toEqual(expectedResponse);

    expect(accountRepository.findById).toHaveBeenCalledWith(event.origin);
  });

  it('Should throw an error if account does not have enough balance', async () => {
    const event: EventDto = {
      type: 'withdraw',
      origin: '1',
      amount: 100,
    };
    const account: Account = {
      id: '1',
      balance: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (accountRepository.findById as jest.Mock).mockResolvedValue(account);

    await expect(withdrawUseCase.execute(event)).rejects.toThrow(
      'Insufficient funds in account: 1',
    );

    expect(accountRepository.findById).toHaveBeenCalledWith(event.origin);
  });

  it('Should throw an error if account not found', async () => {
    const event: EventDto = {
      type: 'withdraw',
      origin: '1',
      amount: 100,
    };
    (accountRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(withdrawUseCase.execute(event)).rejects.toThrow(
      'Origin account not found: 1',
    );

    expect(accountRepository.findById).toHaveBeenCalledWith(event.origin);
  });
});
