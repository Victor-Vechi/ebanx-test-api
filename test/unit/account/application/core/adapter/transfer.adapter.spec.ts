import { Account } from 'generated/prisma/client';
import { TransferAdapter } from 'src/account/application/core/adapter/transfer.adapter';
import { TransferAdapterInterface } from 'src/account/domain/core/adapter/transfer-adapter.interface';

describe('TransferAdapter', () => {
  let transferAdapter: TransferAdapterInterface;

  beforeEach(() => {
    transferAdapter = new TransferAdapter();
  });

  it('Should adapt account to transfer response', () => {
    const originAccount: Account = {
      id: '1',
      balance: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const destinationAccount: Account = {
      id: '10',
      balance: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const expectedResponse = {
      origin: {
        id: '1',
        balance: 100,
      },
      destination: {
        id: '10',
        balance: 100,
      },
    };

    const response = transferAdapter.adapt(originAccount, destinationAccount);
    expect(response).toEqual(expectedResponse);
  });

  it('Should adapt account to transfer response', () => {
    const originAccount: Account = {
      id: '1',
      balance: 25550,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const destinationAccount: Account = {
      id: '10',
      balance: 25550,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const expectedResponse = {
      origin: {
        id: '1',
        balance: 25550,
      },
      destination: {
        id: '10',
        balance: 25550,
      },
    };

    const response = transferAdapter.adapt(originAccount, destinationAccount);
    expect(response).toEqual(expectedResponse);
  });
});
