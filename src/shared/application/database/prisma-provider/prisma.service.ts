
import { Injectable } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import { PrismaServiceInterface } from '../database/domain/prisma-provider/prisma-service.interface';

@Injectable()
export class PrismaService extends PrismaClient implements PrismaServiceInterface {
  constructor() {
    const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
    super({ adapter });
  }
}
