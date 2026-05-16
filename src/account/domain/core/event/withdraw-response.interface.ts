import { EventResponseInterface } from "./event-response.interface";


export interface WithdrawResponseInterface extends EventResponseInterface {
    origin: {
        id: string;
        balance: number;
    }
}