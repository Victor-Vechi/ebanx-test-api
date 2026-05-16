import { DepositResponseInterface } from "./deposit-response.interface";
import { EventResponseInterface } from "./event-response.interface";
import { WithdrawResponseInterface } from "./withdraw-response.interface";


export interface TransferResponseInterface extends EventResponseInterface {
    origin: {
        id: string;
        balance: number;
    },
    destination: {
        id: string;
        balance: number;
    }
}