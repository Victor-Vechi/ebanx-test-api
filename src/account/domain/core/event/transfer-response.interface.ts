import { EventResponseInterface } from "./event-response.interface";


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