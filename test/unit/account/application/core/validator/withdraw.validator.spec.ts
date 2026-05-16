import { WithdrawValidator } from "src/account/application/core/validator/withdraw.validator";
import { WithdrawValidatorInterface } from "src/account/domain/core/validator/withdraw-validator.interface";


describe('WithdrawValidator', () => {

    let withdrawValidator: WithdrawValidatorInterface;

    beforeEach(() => {
        withdrawValidator = new WithdrawValidator();
    })

    it('Should validate withdraw event', () => {
        const event = {
            type: 'withdraw',
            origin: '1',
            amount: 100,
        };
        expect(() => withdrawValidator.execute(event)).not.toThrow();
    })

    it('Should throw error for invalid event type', () => {
        const event = {
            type: 'deposit',
            amount: 100,
        };
        expect(() => withdrawValidator.execute(event)).toThrow('Dados inválidos para saque');
    })
})