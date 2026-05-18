export interface BalanceQueryInterface {
  getAccountBalance(accountId: string): Promise<number>;
  reset(): Promise<void>;
}
