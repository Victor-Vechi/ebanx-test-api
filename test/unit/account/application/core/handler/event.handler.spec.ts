import { EventHandler } from "src/account/application/core/handler/event.handler";
import { DepositUseCaseInterface } from "src/account/domain/core/action/deposit-use-case.interface";
import { TransferUseCaseInterface } from "src/account/domain/core/action/transfer-use-case.interface";
import { WithdrawUseCaseInterface } from "src/account/domain/core/action/withdraw-use-case.interface";
import { EventHandlerInterface } from "src/account/domain/core/handler/event-handler.interface";



describe('EventHandler', () => {

    let eventHandler: EventHandlerInterface;
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

        eventHandler = new EventHandler(depositUseCase, withdrawUseCase, transferUseCase);
    });

    it('Should handle deposit event', () => {
        const event = {
            type: 'deposit',
            destination: '1',
            amount: 100,
        
        };

        eventHandler.processEvent(event);
        expect(depositUseCase.execute).toHaveBeenCalledWith(event);
    })

    it('Should handle withdraw event', () => {
        const event = {
            type: 'withdraw',
            origin: '1',
            amount: 50,
        };

        eventHandler.processEvent(event);
        expect(withdrawUseCase.execute).toHaveBeenCalledWith(event);
    });

    it('Should handle transfer event', () => {
        const event = {
            type: 'transfer',
            origin: '1',
            destination: '10',
            amount: 50,
        };

        eventHandler.processEvent(event);
        expect(transferUseCase.execute).toHaveBeenCalledWith(event);
    });

    it('Should throw error for unknown event type', async () => {
        const event = {
            type: 'unknown',
            destination: '1',
            amount: 100,
        };

        await expect(eventHandler.processEvent(event)).rejects.toThrow(`Unknown event type: ${event.type}`);
    })
})