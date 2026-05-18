import { EventManagerService } from 'src/account/application/core/service/event-manager.service';
import { DepositUseCaseInterface } from 'src/account/domain/core/use-case/deposit-use-case.interface';
import { TransferUseCaseInterface } from 'src/account/domain/core/use-case/transfer-use-case.interface';
import { WithdrawUseCaseInterface } from 'src/account/domain/core/use-case/withdraw-use-case.interface';
import { EventManagerInterface } from 'src/account/domain/core/contract/event-manager.interface';

describe('EventManagerService', () => {
  let eventManager: EventManagerInterface;
  let depositUseCase: DepositUseCaseInterface;
  let withdrawUseCase: WithdrawUseCaseInterface;
  let transferUseCase: TransferUseCaseInterface;
  beforeEach(() => {
    depositUseCase = {
      execute: jest.fn(),
    };

    withdrawUseCase = {
      execute: jest.fn(),
    };

    transferUseCase = {
      execute: jest.fn(),
    };

    eventManager = new EventManagerService(
      depositUseCase,
      withdrawUseCase,
      transferUseCase,
    );
  });

  it('Should handle deposit event', () => {
    const event = {
      type: 'deposit',
      destination: '1',
      amount: 100,
    };

    eventManager.processEvent(event);
    expect(depositUseCase.execute).toHaveBeenCalledWith(event);
  });

  it('Should handle withdraw event', () => {
    const event = {
      type: 'withdraw',
      origin: '1',
      amount: 50,
    };

    eventManager.processEvent(event);
    expect(withdrawUseCase.execute).toHaveBeenCalledWith(event);
  });

  it('Should handle transfer event', () => {
    const event = {
      type: 'transfer',
      origin: '1',
      destination: '10',
      amount: 50,
    };

    eventManager.processEvent(event);
    expect(transferUseCase.execute).toHaveBeenCalledWith(event);
  });

  it('Should throw error for unknown event type', async () => {
    const event = {
      type: 'unknown',
      destination: '1',
      amount: 100,
    };

    await expect(eventManager.processEvent(event)).rejects.toThrow(
      `Unknown event type: ${event.type}`,
    );
  });
});
