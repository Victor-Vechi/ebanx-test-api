import { EventResponseInterface } from './event-response.interface';

export interface DepositResponseInterface extends EventResponseInterface {
  destination: {
    id: string;
    balance: number;
  };
}
