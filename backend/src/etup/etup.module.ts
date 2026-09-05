import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestService } from './ingest.service.js';
import { Etup } from './etup.entity.js';
import { EtupController } from './etup.controller.js';
import { EtupService } from './etup.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Etup])],
  providers: [IngestService, EtupService],
  controllers: [EtupController],
})
export class EtupModule {}
