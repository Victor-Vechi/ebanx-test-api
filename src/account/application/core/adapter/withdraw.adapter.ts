import { Injectable } from '@nestjs/common';
import { Account } from 'generated/prisma/client';
import { WithdrawAdapterInterface } from 'src/account/domain/core/adapter/withdraw-adapter.interface';
import { WithdrawResponseDto } from 'src/account/domain/core/dto/response/withdraw-response.dto';

@Injectable()
export class WithdrawAdapter implements WithdrawAdapterInterface {
  adapt(account: Account): WithdrawResponseDto {
    return new WithdrawResponseDto(
      account.id,
      account.balance,
    );
  };
}
