import { Inject, Injectable } from "@nestjs/common";
import { AccountModel } from "generated/prisma/models";
import { AccountRepositoryInterface } from "src/account/domain/core/repository/account-repository.interface";
import type { PrismaServiceInterface } from "src/shared/domain/database/prisma-provider/prisma-service.interface";


@Injectable()
export class AccountRepository implements AccountRepositoryInterface {
    constructor(
        @Inject('PrismaServiceInterface')
        private readonly prismaService: PrismaServiceInterface,
    ) {}

    async findById(id: string): Promise<AccountModel | null> {
        return this.prismaService.account.findUnique({
            where: { id },
        });
    }

    async saveAll(accounts: AccountModel[]): Promise<AccountModel[]> {
        const result = await this.prismaService.$transaction(async (prisma) => {
            return Promise.all(
                accounts.map((account) =>
                    prisma.account.upsert({
                        where: { id: account.id },
                        update: account,
                        create: account,
                    }),
                ),
            );
        });

        return result
    }

    async save(account: AccountModel): Promise<AccountModel> {
        return this.prismaService.account.upsert({
            where: { id: account.id },
            update: account,
            create: account,
        });
    }

    async resetTable(): Promise<void> {
        await this.prismaService.account.deleteMany();
    }
}