import { Module } from '@nestjs/common';
import { IngestService } from './ingest.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etup } from './etup.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Etup])],
  providers: [IngestService],
})
export class EtupModule {}
