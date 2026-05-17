import { Account } from 'generated/prisma/client';
import { WithdrawAdapter } from 'src/account/application/core/adapter/withdraw.adapter';
import { WithdrawAdapterInterface } from 'src/account/domain/core/adapter/withdraw-adapter.interface';

describe('WithdrawAdapter', () => {
  let withdrawAdapter: WithdrawAdapterInterface;

  beforeEach(() => {
    withdrawAdapter = new WithdrawAdapter();
  });

  it('Should adapt account to withdraw response', () => {
    const account: Account = {
      id: '1',
      balance: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const expectedResponse = {
      origin: {
        id: '1',
        balance: 100,
      },
    };

    const response = withdrawAdapter.adapt(account);
    expect(response).toEqual(expectedResponse);
  });

  it('Should adapt account to withdraw response', () => {
    const account: Account = {
      id: '1',
      balance: 25550,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const expectedResponse = {
      origin: {
        id: '1',
        balance: 25550,
      },
    };

    const response = withdrawAdapter.adapt(account);
    expect(response).toEqual(expectedResponse);
  });
});
