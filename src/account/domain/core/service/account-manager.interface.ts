export interface AccountManagerInterface {
  accountBalance(accountId: string): Promise<number>;
  resetTable(): Promise<void>;
}
