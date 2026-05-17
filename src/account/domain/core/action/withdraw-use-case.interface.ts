import { EventDto } from '../dto/event.dto';
import { WithdrawResponseInterface } from '../event/withdraw-response.interface';

export interface WithdrawUseCaseInterface {
  execute(event: EventDto): Promise<WithdrawResponseInterface>;
}
