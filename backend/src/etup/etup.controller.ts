import { Controller, Get, Query } from '@nestjs/common';
import { EtupService } from './etup.service.js';

@Controller('etup')
export class EtupController {
  constructor(private readonly etupService: EtupService) {}

  @Get('estadisticas')
  async getEstadisticas(
    @Query('anio') anio: string,
    @Query('mesInicio') mesInicio: string,
    @Query('mesFin') mesFin: string,
    @Query('transporte') transporte?: string,
  ) {
    return this.etupService.obtenerEstadisticas(
      anio,
      mesInicio,
      mesFin,
      transporte,
    );
  }

  @Get('filtros')
  async getFiltros() {
    return this.etupService.obtenerFiltros();
  }
}
