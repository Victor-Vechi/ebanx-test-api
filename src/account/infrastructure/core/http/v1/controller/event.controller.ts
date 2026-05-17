import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import type { EventHandlerInterface } from 'src/account/domain/core/handler/event-handler.interface';
import { EventDto } from 'src/account/domain/core/dto/event.dto';
import { DependencyInjectionEnum } from 'src/shared/domain/dependency-injection/dependency-injection.enum';
import type { AccountManagerInterface } from 'src/account/domain/core/service/account-manager.interface';

@Controller()
export class AccountController {
  constructor(
    @Inject(DependencyInjectionEnum.EVENT_HANDLER)
    private readonly eventManager: EventHandlerInterface,
    @Inject(DependencyInjectionEnum.ACCOUNT_MANAGER)
    private readonly accountManager: AccountManagerInterface,
  ) {}

  @Post('/event')
  async handleEvent(
    @Body() body: EventDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const response = await this.eventManager.processEvent(body);
      res.status(HttpStatus.CREATED).send(response);
    } catch (error) {
      console.error('Error processing event:', error);
      res.status(HttpStatus.NOT_FOUND).send(0);
    }
  }

  @Get('/balance')
  async getBalance(
    @Res() res: Response,
    @Query('account_id') accountId: string,
  ): Promise<void> {
    try {
      const balance = await this.accountManager.accountBalance(accountId);
      res.status(HttpStatus.OK).send(balance);
    } catch (error) {
      console.error('Error fetching account balance:', error);
      res.status(HttpStatus.NOT_FOUND).send(0);
    }
  }

  @Post('/reset')
  async reset(@Res() res: Response): Promise<void> {
    try {
      await this.accountManager.resetTable();
      res.sendStatus(HttpStatus.OK);
    } catch (error) {
      console.error('Error resetting account table:', error);
      res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
