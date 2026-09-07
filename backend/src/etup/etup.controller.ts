import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { EtupService } from './etup.service.js';

@Controller('etup')
@UseGuards(AuthGuard)
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
