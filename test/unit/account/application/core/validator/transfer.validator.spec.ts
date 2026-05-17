import { TransferValidator } from 'src/account/application/core/validator/transfer.validator';
import { TransferValidatorInterface } from 'src/account/domain/core/validator/transfer-validator.interface';

describe('TransferValidator', () => {
  let transferValidator: TransferValidatorInterface;

  beforeEach(() => {
    transferValidator = new TransferValidator();
  });

  it('Should validate transfer event', () => {
    const event = {
      type: 'transfer',
      origin: '1',
      destination: '2',
      amount: 100,
    };
    expect(() => transferValidator.execute(event)).not.toThrow();
  });

  it('Should throw error for invalid event type', () => {
    const event = {
      type: 'transfer',
      origin: '1',
      amount: 100,
    };
    expect(() => transferValidator.execute(event)).toThrow(
      'Dados inválidos para transferência',
    );
  });

  it('Should throw error for invalid event type', () => {
    const event = {
      type: 'transfer',
      destination: '1',
      amount: 100,
    };
    expect(() => transferValidator.execute(event)).toThrow(
      'Dados inválidos para transferência',
    );
  });
});
