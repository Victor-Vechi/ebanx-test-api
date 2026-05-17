import { Account } from 'generated/prisma/client';
import { TransferResponseInterface } from '../event/transfer-response.interface';

export interface TransferAdapterInterface {
  adapt(origin: Account, destination: Account): TransferResponseInterface;
}
