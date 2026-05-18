import { EventDto } from '../dto/request/event.dto';
import { DepositResponseInterface } from '../dto/response/deposit-response.dto';

export interface DepositUseCaseInterface {
  execute(event: EventDto): Promise<DepositResponseInterface>;
}
