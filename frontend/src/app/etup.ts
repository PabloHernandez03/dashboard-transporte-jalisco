import { Service, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment'

export interface EtupData {
  ingresosPorPasaje: number | null;
  longitudDeServicio: number | null;
  pasajerosTransportados: number | null;
  kilometrosRecorridos: number | null;
   unidadesEnOperacion: number | null;
}

export interface Filtros {
  anios: number[];
  transportes: string[];
}

@Service()
export class Etup {
    private http = inject(HttpClient);

    obtenerEstadisticas(anio: number, mesInicio: number,  mesFin: number, transporte?: string){
        let params = new HttpParams()
          .set('anio', anio)
          .set('mesInicio', mesInicio)
          .set('mesFin', mesFin);

        if (transporte) {
            params = params.set('transporte', transporte);
        }

        return this.http.get<EtupData>(`${environment.apiUrl}/etup/estadisticas`, {params});
    }

    obtenerFiltros() {
        return this.http.get<Filtros>(`${environment.apiUrl}/etup/filtros`)
    }
}
