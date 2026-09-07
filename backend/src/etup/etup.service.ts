import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Etup } from './etup.entity.js';
import { Repository } from 'typeorm';

const METRICAS = [
  {
    variable: 'Ingresos por pasaje',
    clave: 'ingresosPorPasaje',
    agregacion: 'suma',
  },
  {
    variable: 'Longitud de servicio',
    clave: 'longitudDeServicio',
    agregacion: 'promedio',
  },
  {
    variable: 'Kilómetros recorridos',
    clave: 'kilometrosRecorridos',
    agregacion: 'suma',
  },
  {
    variable: 'Pasajeros transportados',
    clave: 'pasajerosTransportados',
    agregacion: 'suma',
  },
  {
    variable: 'Unidades en operación',
    clave: 'unidadesEnOperacion',
    agregacion: 'promedio',
  },
] as const;

@Injectable()
export class EtupService {
  constructor(
    @InjectRepository(Etup)
    private readonly repo: Repository<Etup>,
  ) {}

  async obtenerEstadisticas(
    anio: string,
    mesInicio: string,
    mesFin: string,
    transporte?: string,
  ) {
    let query = `SELECT variable,
              SUM(valor) AS suma,
              AVG(valor) AS promedio
        FROM etup
        WHERE anio = $1
          AND mes BETWEEN $2 AND $3
          AND variable = ANY($4)
          AND ($5::text IS NULL OR transporte = $5)
        GROUP BY variable
        ORDER BY variable
      `;
    const result = await this.repo.query(query, [
      anio,
      mesInicio,
      mesFin,
      METRICAS.map((m) => m.variable),
      transporte ?? null,
    ]);
    const resultFinal = Object.fromEntries(
      METRICAS.map((metrica) => {
        const row = result.find((r: any) => r.variable === metrica.variable);

        const valor = row
          ? metrica.agregacion === 'suma'
            ? parseFloat(row.suma)
            : parseFloat(row.promedio)
          : null;

        return [metrica.clave, valor];
      }),
    );
    return resultFinal;
  }

  async obtenerFiltros() {
    let anio = `SELECT DISTINCT anio
        FROM etup
        ORDER BY anio DESC
      `;
    let transporte = `SELECT DISTINCT transporte
        FROM etup
        ORDER BY transporte ASC
      `;
    let resultAnio = await this.repo.query(anio);
    let resultTransporte = await this.repo.query(transporte);
    return {
      anios: resultAnio.map((r: any) => r.anio),
      transportes: resultTransporte.map((r: any) => r.transporte),
    };
  }
}
