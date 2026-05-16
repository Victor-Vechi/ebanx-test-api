import { Account } from "generated/prisma/client";
import { AccountRepositoryInterface } from "src/account/domain/core/repository/account-repository.interface";
import { AccountRepository } from "src/account/infrastructure/core/persistence/repository/account.repository";
import { PrismaService } from "src/shared/application/database/prisma-provider/prisma.service";
import { PrismaServiceInterface } from "src/shared/domain/database/prisma-provider/prisma-service.interface";



describe('AccountRepository', () => {

    let accountRepository: AccountRepositoryInterface;

    let prismaMock: jest.Mocked<PrismaServiceInterface>;

    beforeEach(() => {
        prismaMock = new PrismaService() as jest.Mocked<PrismaServiceInterface>;

        accountRepository = new AccountRepository(prismaMock);
    })


    it('Should find account by id', async () => {
        const account: Account = {
            id: "1",
            balance: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        prismaMock.account.findUnique = jest.fn().mockResolvedValue(account);

        const result = await accountRepository.findById("1");
        expect(prismaMock.account.findUnique).toHaveBeenCalledWith({
            where: { id: "1" },
        });
        expect(result).toEqual(account);
    })

    it('Should save accounts', async () => {
        const accounts: Account[] = [
            {
                id: "1",
                balance: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "2",
                balance: 200,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        prismaMock.$transaction = jest.fn().mockImplementation(async (callback) => {
            const prisma = {
                account: {
                    upsert: jest.fn().mockImplementation(({ where, update, create }) => {
                        const account = accounts.find(acc => acc.id === where.id);
                        if (account) {
                            Object.assign(account, update);
                            return account;
                        }
                        const newAccount = { ...create };
                        accounts.push(newAccount);
                        return newAccount;
                    }
                    ),
                },
            };
            return callback(prisma);
        });

        const result = await accountRepository.saveAll(accounts);
        expect(prismaMock.$transaction).toHaveBeenCalled();
        expect(result).toEqual(accounts);
    })

    it('Should save account', async () => {
        const account: Account = {
            id: "1",
            balance: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        prismaMock.account.upsert = jest.fn().mockResolvedValue(account);

        const result = await accountRepository.save(account);
        expect(prismaMock.account.upsert).toHaveBeenCalledWith({
            where: { id: account.id },
            update: account,
            create: account,
        });
        expect(result).toEqual(account);
    })

    it('Should reset account table', async () => {
        prismaMock.account.deleteMany = jest.fn().mockResolvedValue({ count: 2 });

        await accountRepository.resetTable();
        expect(prismaMock.account.deleteMany).toHaveBeenCalled();
    })


})