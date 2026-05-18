import { EventResponseDto } from './event-response.dto';

export class WithdrawResponseDto extends EventResponseDto {
  origin: { id: string; balance: number };

  constructor(id: string, balance: number) {
    super();
    this.origin = { id, balance };
  }
}
