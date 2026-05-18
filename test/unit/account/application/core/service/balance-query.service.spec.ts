import { AccountModel } from "generated/prisma/models";
import { BalanceQueryService } from "src/account/application/core/service/balance-query.service";
import { AccountManagerInterface } from "src/account/domain/core/contract/account-manager.interface";




describe('BalanceQueryService', () => {
    let balanceQueryService: BalanceQueryService;
    let accountManager: AccountManagerInterface;
    beforeEach(() => {
        accountManager = {
            getAccount: jest.fn(),
            getDestinationAccount: jest.fn(),
            saveAccount: jest.fn(),
            saveTransaction: jest.fn(),
            resetTable: jest.fn(),
        };
        balanceQueryService = new BalanceQueryService(accountManager);
    });

    it('Should return account balance', async () => {
        const account: AccountModel = {
            id: '1',
            balance: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        (accountManager.getAccount as jest.Mock).mockResolvedValue(account);

        const balance = await balanceQueryService.getAccountBalance('1');
        expect(balance).toBe(100);
        expect(accountManager.getAccount).toHaveBeenCalledWith('1');
    }
    );

    it('Should throw AccountNotFoundException if account does not exist', async () => {
        (accountManager.getAccount as jest.Mock).mockResolvedValue(null);
        await expect(balanceQueryService.getAccountBalance('1')).rejects.toThrow('Origin account not found: 1');
        expect(accountManager.getAccount).toHaveBeenCalledWith('1');
    }
    );
    
    it('Should reset account table', async () => {
        await balanceQueryService.reset();
        expect(accountManager.resetTable).toHaveBeenCalled();
    }
    );
});