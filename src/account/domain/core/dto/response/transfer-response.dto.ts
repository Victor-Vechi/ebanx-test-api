import { EventResponseDto } from './event-response.dto';

export class TransferResponseDto extends EventResponseDto {
  origin: { id: string; balance: number };
  destination: { id: string; balance: number };

  constructor(
    originId: string,
    originBalance: number,
    destinationId: string,
    destinationBalance: number,
  ) {
    super();
    this.origin = { id: originId, balance: originBalance };
    this.destination = { id: destinationId, balance: destinationBalance };
  }
}
