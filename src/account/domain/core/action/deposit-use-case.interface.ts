import { EventDto } from '../dto/request/event.dto';
import { DepositResponseDto } from '../dto/response/deposit-response.dto';

export interface DepositUseCaseInterface {
  execute(event: EventDto): Promise<DepositResponseDto>;
}
