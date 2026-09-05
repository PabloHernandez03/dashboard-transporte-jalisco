import { Inject, Injectable } from '@nestjs/common';
import { normalize } from './normalize.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Etup } from './etup.entity.js';

interface RegistroCrudo {
  _id: string;
  Valor?: number;
  Anio: number;
  ID_mes: number;
  Transporte: string;
  Variable: string;
  Municipio: string;
  Estatus: string;
}

interface RespuestaApi {
  data: RegistroCrudo[];
}

@Injectable()
export class IngestService {
  constructor(
    @InjectRepository(Etup)
    private readonly repo: Repository<Etup>,
  ) {}

  async ingestData(): Promise<void> {
    let res = await fetch('http://apiiieg.jalisco.gob.mx/api/etup');
    try {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = (await res.json()) as RespuestaApi;
      const filas = json.data.map((r) => ({
        source_id: r._id,
        valor: r.Valor ?? null,
        anio: r.Anio,
        mes: r.ID_mes,
        transporte: normalize(r.Transporte),
        variable: r.Variable,
        municipio: r.Municipio,
        estatus: normalize(r.Estatus),
      }));
      const TAMAÑO = 500;
      for (let i = 0; i < filas.length; i += TAMAÑO) {
        const lote = filas.slice(i, i + TAMAÑO);
        await this.repo.upsert(lote, ['source_id']);
      }
      console.log(`Ingested ${filas.length} records into the database.`);
    } catch (error) {
      console.error('Error ingesting data:', error);
    }
  }
}
