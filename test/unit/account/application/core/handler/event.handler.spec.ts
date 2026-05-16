import { EventHandler } from "src/account/application/core/handler/event.handler";
import { DepositUseCaseInterface } from "src/account/domain/core/action/deposit-use-case.interface";
import { EventHandlerInterface } from "src/account/domain/core/handler/event-handler.interface";



describe('EventHandler', () => {

    let eventHandler: EventHandlerInterface;
    let depositUseCase: DepositUseCaseInterface;
    beforeEach(() => {

        depositUseCase = {
            execute: jest.fn(),
        };

        eventHandler = new EventHandler(depositUseCase);
    });

    it('Should handle event', () => {
        const event = {
            type: 'deposit',
            destination: '1',
            amount: 100,
        
        };

        eventHandler.processEvent(event);
        expect(depositUseCase.execute).toHaveBeenCalledWith(event);
    })


    it('Should throw error for unknown event type', async () => {
        const event = {
            type: 'unknown',
            destination: '1',
            amount: 100,
        };

        await expect(eventHandler.processEvent(event)).rejects.toThrow(`Unknown event type: ${event.type}`);
    })
})