import { Account } from "generated/prisma/client";
import { AccountManagerService } from "src/account/application/core/service/account-manager.service";
import { AccountRepositoryInterface } from "src/account/domain/core/repository/account-repository.interface";
import { AccountManagerInterface } from "src/account/domain/core/service/account-manager.interface";



describe('AccountManagerService', () => {
    let accountManagerService: AccountManagerInterface;
    let accountRepository: AccountRepositoryInterface;

    beforeEach(() => {

        accountRepository = {
            findById: jest.fn(),
            saveAll: jest.fn(),
            save: jest.fn(),
            resetTable: jest.fn(),
        };

        accountManagerService = new AccountManagerService(accountRepository);
    });

    it('Should return account balance', async () => {
        const account: Account = {
            id: "1",
            balance: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        (accountRepository.findById as jest.Mock).mockResolvedValue(account);

        const balance = await accountManagerService.accountBalance("1");
        expect(balance).toBe(100);
    })

    it('Should throw AccountNotFoundException', async () => {
        (accountRepository.findById as jest.Mock).mockResolvedValue(null);
        await expect(accountManagerService.accountBalance("1")).rejects.toThrow('Origin account not found: 1');
    })


    it('Should reset account repository table', () => {
        accountManagerService.resetTable();
        expect(accountRepository.resetTable).toHaveBeenCalled();
    })
})