import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { PrismaSeeds } from './prisma.seed';

@Module({
  providers: [PrismaService, PrismaSeeds],
  exports: [PrismaService],
})
export class PrismaModule {}
