import { Injectable } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaServiceInterface } from 'src/shared/domain/database/prisma-provider/prisma-service.interface';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements PrismaServiceInterface
{
  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
    super({ adapter });
  }
}
