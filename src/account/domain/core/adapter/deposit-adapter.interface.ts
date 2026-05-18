import { Account } from 'generated/prisma/client';
import { DepositResponseDto } from '../dto/response/deposit-response.dto';

export interface DepositAdapterInterface {
  adapt(account: Account): DepositResponseDto;
}
