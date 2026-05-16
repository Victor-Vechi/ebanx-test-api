import { AccountModel } from "generated/prisma/models";


export interface AccountRepositoryInterface {
    findById(id: string): Promise<AccountModel | null>;
    save(accounts: AccountModel[]): Promise<AccountModel[]>;
    resetTable(): Promise<void>;
}