import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';


@Module({
    imports: [
        SharedModule,
        AccountModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
