import { EventDto } from '../dto/event.dto';
import { TransferResponseInterface } from '../event/transfer-response.interface';

export interface TransferUseCaseInterface {
  execute(event: EventDto): Promise<TransferResponseInterface>;
}
