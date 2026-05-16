import { Module } from '@nestjs/common';
import { PrismaService } from './application/database/prisma-provider/prisma.service';


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
