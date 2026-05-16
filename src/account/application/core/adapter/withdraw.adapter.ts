import { Injectable } from "@nestjs/common";
import { Account } from "generated/prisma/client";
import { WithdrawAdapterInterface } from "src/account/domain/core/adapter/withdraw-adapter.interface";
import { WithdrawResponseInterface } from "src/account/domain/core/event/withdraw-response.interface";

@Injectable()
export class WithdrawAdapter implements WithdrawAdapterInterface {

    adapt(account: Account): WithdrawResponseInterface {
        return {
            origin: {
                id: account.id,
                balance: account.balance,
            }
        };
    }
}