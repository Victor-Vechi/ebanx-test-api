import { BadRequestException, Injectable } from '@nestjs/common';
import { DepositValidatorInterface } from 'src/account/domain/core/validator/deposit-validator.interface';
import { EventDto } from 'src/account/domain/core/dto/event.dto';

@Injectable()
export class DepositValidator implements DepositValidatorInterface {
  execute(event: EventDto): void {
    if (!event.destination) {
      throw new BadRequestException('Dados inválidos para depósito');
    }
  }
}
