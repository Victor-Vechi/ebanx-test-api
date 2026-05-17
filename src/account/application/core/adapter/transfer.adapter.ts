import { Injectable } from '@nestjs/common';
import { Account } from 'generated/prisma/client';
import { TransferAdapterInterface } from 'src/account/domain/core/adapter/transfer-adapter.interface';
import { TransferResponseInterface } from 'src/account/domain/core/event/transfer-response.interface';

@Injectable()
export class TransferAdapter implements TransferAdapterInterface {
  adapt(origin: Account, destination: Account): TransferResponseInterface {
    return {
      origin: {
        id: origin.id,
        balance: origin.balance,
      },
      destination: {
        id: destination.id,
        balance: destination.balance,
      },
    };
  }
}
