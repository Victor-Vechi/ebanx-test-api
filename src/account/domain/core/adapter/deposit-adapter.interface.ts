import { Account } from "generated/prisma/client";
import { DepositResponseInterface } from "../event/deposit-response.interface";

export interface DepositAdapterInterface {
    adapt(account: Account): DepositResponseInterface;
}