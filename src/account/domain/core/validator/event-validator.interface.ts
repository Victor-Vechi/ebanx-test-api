import { EventDto } from '../dto/request/event.dto';

export interface EventValidatorInterface {
  execute(event: EventDto): void;
}
