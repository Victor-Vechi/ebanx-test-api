import { Injectable } from '@nestjs/common';
import { Account } from 'generated/prisma/client';
import { DepositAdapterInterface } from 'src/account/domain/core/adapter/deposit-adapter.interface';
import { DepositResponseInterface } from 'src/account/domain/core/event/deposit-response.interface';

@Injectable()
export class DepositAdapter implements DepositAdapterInterface {
  adapt(account: Account): DepositResponseInterface {
    return {
      destination: {
        id: account.id,
        balance: account.balance,
      },
    };
  }
}
