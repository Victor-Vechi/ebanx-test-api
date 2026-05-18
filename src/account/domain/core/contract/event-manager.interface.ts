import { EventDto } from '../dto/request/event.dto';
import { EventResponseDto } from '../dto/response/event-response.dto';

export interface EventManagerInterface {
  processEvent(event: EventDto): Promise<EventResponseDto>;
}
