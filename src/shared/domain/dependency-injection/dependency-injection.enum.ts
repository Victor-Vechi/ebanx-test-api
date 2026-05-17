export enum DependencyInjectionEnum {
  EVENT_HANDLER = 'EventHandlerInterface',

  //Services
  ACCOUNT_TRANSACTION = 'AccountTransactionInterface',
  ACCOUNT_MANAGER = 'AccountManagerInterface',

  // Use Cases
  DEPOSIT_CASE = 'DepositUseCaseInterface',
  WITHDRAW_CASE = 'WithdrawUseCaseInterface',
  TRANSFER_CASE = 'TransferUseCaseInterface',

  // Adapters
  DEPOSIT_ADAPTER = 'DepositAdapterInterface',
  WITHDRAW_ADAPTER = 'WithdrawAdapterInterface',
  TRANSFER_ADAPTER = 'TransferAdapterInterface',

  // Validators
  DEPOSIT_VALIDATOR = 'DepositValidatorInterface',
  WITHDRAW_VALIDATOR = 'WithdrawValidatorInterface',
  TRANSFER_VALIDATOR = 'TransferValidatorInterface',

  // Repositories
  ACCOUNT_REPOSITORY = 'AccountRepositoryInterface',

  // Database
  PRISMA_SERVICE = 'PrismaServiceInterface',
}
