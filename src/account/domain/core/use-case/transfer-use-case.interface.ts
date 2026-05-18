import { EventDto } from '../dto/request/event.dto';
import { TransferResponseDto } from '../dto/response/transfer-response.dto';

export interface TransferUseCaseInterface {
  execute(event: EventDto): Promise<TransferResponseDto>;
}
