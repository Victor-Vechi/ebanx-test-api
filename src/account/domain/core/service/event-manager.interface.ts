import { EventDto } from '../dto/event.dto';
import { EventResponseInterface } from '../event/event-response.interface';

export interface EventManagerInterface {
  processEvent(event: EventDto): Promise<EventResponseInterface>;
}
