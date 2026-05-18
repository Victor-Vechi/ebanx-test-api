import { Account } from 'generated/prisma/client';
import { WithdrawResponseDto } from '../dto/response/withdraw-response.dto';

export interface WithdrawAdapterInterface {
  adapt(account: Account): WithdrawResponseDto;
}
