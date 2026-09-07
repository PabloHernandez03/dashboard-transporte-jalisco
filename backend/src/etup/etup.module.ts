import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestService } from './ingest.service.js';
import { Etup } from './etup.entity.js';
import { EtupController } from './etup.controller.js';
import { AuthModule } from '../auth/auth.module.js';
import { EtupService } from './etup.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Etup]), AuthModule],
  providers: [IngestService, EtupService],
  controllers: [EtupController],
})
export class EtupModule {}
