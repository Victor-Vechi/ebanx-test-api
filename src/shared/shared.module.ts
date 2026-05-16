import { Module } from '@nestjs/common';
import { PrismaService } from './database/application/prisma-provider/prisma.service';


@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: 'PrismaServiceInterface',
            useClass: PrismaService,
        }
    ],
})
export class SharedModule { }
