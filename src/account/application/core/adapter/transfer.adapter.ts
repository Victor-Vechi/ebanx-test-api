import { Injectable } from '@nestjs/common';
import { Account } from 'generated/prisma/client';
import { TransferAdapterInterface } from 'src/account/domain/core/adapter/transfer-adapter.interface';
import { TransferResponseDto } from 'src/account/domain/core/dto/response/transfer-response.dto';

@Injectable()
export class TransferAdapter implements TransferAdapterInterface {
  adapt(origin: Account, destination: Account): TransferResponseDto {
    return new TransferResponseDto(
      origin.id,
      origin.balance,
      destination.id,
      destination.balance,
    );
  }
}
