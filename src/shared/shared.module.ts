import { Module } from '@nestjs/common';
import { PrismaService } from './application/database/prisma-provider/prisma.service';
import { DependencyInjectionEnum } from './domain/dependency-injection/dependency-injection.enum';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: DependencyInjectionEnum.PRISMA_SERVICE,
      useClass: PrismaService,
    },
  ],
  exports: [DependencyInjectionEnum.PRISMA_SERVICE],
})
export class SharedModule {}
