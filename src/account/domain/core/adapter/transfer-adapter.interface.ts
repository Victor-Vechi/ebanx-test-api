import { Account } from 'generated/prisma/client';
import { TransferResponseDto } from '../dto/response/transfer-response.dto';

export interface TransferAdapterInterface {
  adapt(origin: Account, destination: Account): TransferResponseDto;
}
