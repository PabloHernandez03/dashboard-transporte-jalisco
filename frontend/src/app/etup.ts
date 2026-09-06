import { Service, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface EtupData {
  ingresosPorPasaje: number | null;
  longitudDeServicio: number | null;
    pasajerosTransportados: number | null;
    kilometrosRecorridos: number | null;
    unidadesEnOperacion: number | null;
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

        return this.http.get<EtupData>('http://localhost:3000/etup/estadisticas', {params});
    }
}
