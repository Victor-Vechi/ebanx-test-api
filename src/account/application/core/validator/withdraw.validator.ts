import { BadRequestException, Injectable } from '@nestjs/common';
import { EventDto } from 'src/account/domain/core/dto/event.dto';
import { WithdrawValidatorInterface } from 'src/account/domain/core/validator/withdraw-validator.interface';

@Injectable()
export class WithdrawValidator implements WithdrawValidatorInterface {
  execute(event: EventDto): void {
    if (!event.origin) {
      throw new BadRequestException('Dados inválidos para saque');
    }
  }
}
