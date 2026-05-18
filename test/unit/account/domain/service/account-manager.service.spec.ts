import { Account } from 'generated/prisma/client';
import { AccountManagerService } from 'src/account/domain/core/service/account-manager.service';
import { AccountRepositoryInterface } from 'src/account/domain/core/repository/account-repository.interface';
import { AccountManagerInterface } from 'src/account/domain/core/contract/account-manager.interface';

describe('AccountManagerService', () => {
  let accountManagerService: AccountManagerInterface;
  let accountRepository: AccountRepositoryInterface;

  beforeEach(() => {
    accountRepository = {
      findById: jest.fn(),
      saveAll: jest.fn(),
      save: jest.fn(),
      resetTable: jest.fn(),
    };

    accountManagerService = new AccountManagerService(accountRepository);
  });

  it('Should get destination account', async () => {
    const account: Account = {
      id: '1',
      balance: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (accountRepository.findById as jest.Mock).mockResolvedValue(account);

    const destinationAccount = await accountManagerService.getDestinationAccount('1');
    expect(destinationAccount).toEqual(account);
  });

  it('Should create destination account if not exists', async () => {
    const account: Account = {
      id: '1',
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (accountRepository.findById as jest.Mock).mockResolvedValue(null);

    const destinationAccount = await accountManagerService.getDestinationAccount('1');
    expect(destinationAccount).toEqual(account);
  });

  it('Should save account', async () => {
    const account: Account = {
      id: '1',
      balance: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await accountManagerService.saveAccount(account);
    expect(accountRepository.save).toHaveBeenCalledWith(account);
  });

  it('Should save transaction', async () => {
    const accounts: Account[] = [
      {
        id: '1',
        balance: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        balance: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await accountManagerService.saveTransaction(accounts);
    expect(accountRepository.saveAll).toHaveBeenCalledWith(accounts);
  });

  it('Should reset account repository table', () => {
    accountManagerService.resetTable();
    expect(accountRepository.resetTable).toHaveBeenCalled();
  });
});
