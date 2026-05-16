import { Account } from "generated/prisma/client";
import { DepositAdapter } from "src/account/application/core/adapter/deposit.adapter";
import { DepositAdapterInterface } from "src/account/domain/core/adapter/deposit-adapter.interface";



describe('DepositAdapter', () => {
    let depositAdapter: DepositAdapterInterface;

    beforeEach(() => {
        depositAdapter = new DepositAdapter();
    });


    it('Should adapt account to deposit response', () => {
        const account: Account = {
            id: "1",
            balance: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const expectedResponse = {
            destination: {
                id: "1",
                balance: 100,
            }
        };

        const response = depositAdapter.adapt(account);
        expect(response).toEqual(expectedResponse);
    })

    it('Should adapt account to deposit response', () => {
        const account: Account = {
            id: "1",
            balance: 25550,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const expectedResponse = {
            destination: {
                id: "1",
                balance: 25550,
            }
        };

        const response = depositAdapter.adapt(account);
        expect(response).toEqual(expectedResponse);
    })
});