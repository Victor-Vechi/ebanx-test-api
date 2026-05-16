

export enum DependencyInjectionEnum {
    EVENT_HANDLER = 'EventHandlerInterface',

    //Services
    ACCOUNT_TRANSACTION = 'AccountTransactionInterface',

    // Use Cases
    DEPOSIT_CASE = 'DepositUseCaseInterface',

    // Adapters
    DEPOSIT_ADAPTER = 'DepositAdapterInterface',

    // Validators
    DEPOSIT_VALIDATOR = 'DepositValidatorInterface',

    // Repositories
    ACCOUNT_REPOSITORY = 'AccountRepositoryInterface',
    
    // Database
    PRISMA_SERVICE = 'PrismaServiceInterface',
}