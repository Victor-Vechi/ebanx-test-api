import { EventDto } from '../dto/request/event.dto';
import { WithdrawResponseInterface } from '../dto/response/withdraw-response.dto';

export interface WithdrawUseCaseInterface {
  execute(event: EventDto): Promise<WithdrawResponseInterface>;
}
