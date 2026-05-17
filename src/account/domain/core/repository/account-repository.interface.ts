import { AccountModel } from 'generated/prisma/models';

export interface AccountRepositoryInterface {
  findById(id: string): Promise<AccountModel | null>;
  saveAll(accounts: AccountModel[]): Promise<AccountModel[]>;
  save(account: AccountModel): Promise<AccountModel>;
  resetTable(): Promise<void>;
}
