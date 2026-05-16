

export enum DependencyInjectionEnum {
    EVENT_HANDLER = 'EventHandlerInterface',

    //Services
    ACCOUNT_TRANSACTION = 'AccountTransactionInterface',

    // Use Cases
    DEPOSIT_CASE = 'DepositUseCaseInterface',
    WITHDRAW_CASE = 'WithdrawUseCaseInterface',

    // Adapters
    DEPOSIT_ADAPTER = 'DepositAdapterInterface',
    WITHDRAW_ADAPTER = 'WithdrawAdapterInterface',

    // Validators
    DEPOSIT_VALIDATOR = 'DepositValidatorInterface',
    WITHDRAW_VALIDATOR = 'WithdrawValidatorInterface',

    // Repositories
    ACCOUNT_REPOSITORY = 'AccountRepositoryInterface',
    
    // Database
    PRISMA_SERVICE = 'PrismaServiceInterface',
}