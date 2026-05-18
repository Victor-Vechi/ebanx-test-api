import { AccountModel } from "generated/prisma/models";

export interface AccountManagerInterface {
  getAccount(accountId: string): Promise<AccountModel | null>
  getDestinationAccount(accountId: string): Promise<AccountModel>;
  saveAccount(account: AccountModel): Promise<void>;
  saveTransaction(accounts: AccountModel[]): Promise<void>;
  resetTable(): Promise<void>;
}
