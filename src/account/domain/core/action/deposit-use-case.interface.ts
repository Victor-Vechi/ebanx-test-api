import { EventDto } from '../dto/event.dto';
import { DepositResponseInterface } from '../event/deposit-response.interface';

export interface DepositUseCaseInterface {
  execute(event: EventDto): Promise<DepositResponseInterface>;
}
