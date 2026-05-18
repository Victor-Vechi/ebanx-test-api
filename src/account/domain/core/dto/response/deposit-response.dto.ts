import { EventResponseDto } from './event-response.dto';

export class DepositResponseDto extends EventResponseDto {
  destination: { id: string; balance: number; };

  constructor ( id: string, balance: number ) {
    super();
    this.destination = {
      id,
      balance
    };
  }
}
