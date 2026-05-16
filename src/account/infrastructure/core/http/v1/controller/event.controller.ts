import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import type { EventHandlerInterface } from 'src/account/domain/core/handler/event-handler.interface';
import { EventDto } from 'src/account/domain/core/dto/event.dto';
import { DependencyInjectionEnum } from 'src/shared/domain/dependency-injection/dependency-injection.enum';

@Controller()
export class AccountController {
    constructor(
        @Inject(DependencyInjectionEnum.EVENT_HANDLER) private readonly eventManager: EventHandlerInterface
    ) { }

    @Post('/event')
        async handleEvent(@Body() body: EventDto, @Res() res: Response): Promise<void> {
            try {
                const response = await this.eventManager.processEvent(body);
                res.status(HttpStatus.CREATED).send(response);
            } catch (error) {
                console.error('Error processing event:', error);
                res.status(HttpStatus.NOT_FOUND).send(0);
            }
        }
}