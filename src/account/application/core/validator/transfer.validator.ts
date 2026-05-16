import { BadRequestException, Injectable } from "@nestjs/common";
import { DepositValidatorInterface } from "src/account/domain/core/validator/deposit-validator.interface";
import { EventDto } from "src/account/domain/core/dto/event.dto";
import { TransferValidatorInterface } from "src/account/domain/core/validator/transfer-validator.interface";


@Injectable()
export class TransferValidator implements TransferValidatorInterface {

    execute(event: EventDto): void {
        if (!event.destination || !event.origin) {
            throw new BadRequestException('Dados inválidos para transferência');
        }
    }

}