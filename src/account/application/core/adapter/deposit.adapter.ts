import { Injectable } from '@nestjs/common';
import { Account } from 'generated/prisma/client';
import { DepositAdapterInterface } from 'src/account/domain/core/adapter/deposit-adapter.interface';
import { DepositResponseDto } from 'src/account/domain/core/dto/response/deposit-response.dto';

@Injectable()
export class DepositAdapter implements DepositAdapterInterface {
  adapt(account: Account): DepositResponseDto {
    return new DepositResponseDto(
      account.id,
      account.balance,
    );
  }
}
