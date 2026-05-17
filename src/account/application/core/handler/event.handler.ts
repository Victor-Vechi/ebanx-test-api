import { Inject, Injectable } from '@nestjs/common';
import type { DepositUseCaseInterface } from 'src/account/domain/core/action/deposit-use-case.interface';
import type { TransferUseCaseInterface } from 'src/account/domain/core/action/transfer-use-case.interface';
import type { WithdrawUseCaseInterface } from 'src/account/domain/core/action/withdraw-use-case.interface';
import { EventDto } from 'src/account/domain/core/dto/event.dto';
import { EventResponseInterface } from 'src/account/domain/core/event/event-response.interface';
import { EventType } from 'src/account/domain/core/event/event-type.enum';
import { EventInvalidException } from 'src/account/domain/core/exception/event-invalid.exception';
import { EventHandlerInterface } from 'src/account/domain/core/handler/event-handler.interface';
import { DependencyInjectionEnum } from 'src/shared/domain/dependency-injection/dependency-injection.enum';

@Injectable()
export class EventHandler implements EventHandlerInterface {
  constructor(
    @Inject(DependencyInjectionEnum.DEPOSIT_CASE)
    private readonly depositAction: DepositUseCaseInterface,
    @Inject(DependencyInjectionEnum.WITHDRAW_CASE)
    private readonly withdrawAction: WithdrawUseCaseInterface,
    @Inject(DependencyInjectionEnum.TRANSFER_CASE)
    private readonly transferAction: TransferUseCaseInterface,
  ) {}

  async processEvent(event: EventDto): Promise<EventResponseInterface> {
    switch (event.type.toLowerCase()) {
      case EventType.DEPOSIT:
        return await this.depositAction.execute(event);
      case EventType.WITHDRAW:
        return await this.withdrawAction.execute(event);
      case EventType.TRANSFER:
        return await this.transferAction.execute(event);
      default:
        throw new EventInvalidException(event.type);
    }
  }
}
