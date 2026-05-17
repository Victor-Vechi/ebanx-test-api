import { DepositValidator } from 'src/account/application/core/validator/deposit.validator';
import { DepositValidatorInterface } from 'src/account/domain/core/validator/deposit-validator.interface';

describe('DepositValidator', () => {
  let depositValidator: DepositValidatorInterface;

  beforeEach(() => {
    depositValidator = new DepositValidator();
  });

  it('Should validate deposit event', () => {
    const event = {
      type: 'deposit',
      destination: '1',
      amount: 100,
    };
    expect(() => depositValidator.execute(event)).not.toThrow();
  });

  it('Should throw error for invalid event type', () => {
    const event = {
      type: 'deposit',
      amount: 100,
    };
    expect(() => depositValidator.execute(event)).toThrow(
      'Dados inválidos para depósito',
    );
  });
});
