import { Inject, Injectable } from '@nestjs/common';
import type { DepositUseCaseInterface } from 'src/account/domain/core/action/deposit-use-case.interface';
import { EventDto } from 'src/account/domain/core/dto/event.dto';
import { EventResponseInterface } from 'src/account/domain/core/event/event-response.interface';
import { EventType } from 'src/account/domain/core/event/event-type.enum';
import { EventHandlerInterface } from 'src/account/domain/core/handler/event-handler.interface';
import { DependencyInjectionEnum } from 'src/shared/domain/dependency-injection/dependency-injection.enum';


@Injectable()
export class EventHandler implements EventHandlerInterface {
    constructor(
        @Inject(DependencyInjectionEnum.DEPOSIT_CASE) private readonly depositAction: DepositUseCaseInterface,
    ) {}

    async processEvent(event: EventDto): Promise<EventResponseInterface> {
        switch (event.type.toLowerCase()) {
            case EventType.DEPOSIT:
                return await this.depositAction.execute(event);
            default:
                throw new Error(`Unknown event type: ${event.type}`);
        }
    }
}