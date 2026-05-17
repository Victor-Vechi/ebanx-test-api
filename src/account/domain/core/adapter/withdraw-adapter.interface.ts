import { Account } from 'generated/prisma/client';
import { WithdrawResponseInterface } from '../event/withdraw-response.interface';

export interface WithdrawAdapterInterface {
  adapt(account: Account): WithdrawResponseInterface;
}
