import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { IngestService } from './etup/ingest.service.js';

async function run() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const ingestService = await app.get(IngestService);
    await ingestService.ingestData();
    await app.close();
}
await run();
