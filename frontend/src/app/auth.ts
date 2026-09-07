import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../environments/environment';

export interface RespuestaLogin {
  accessToken: string;
  usuario: string;
}

const CLAVE_TOKEN = 'token';

@Service()
export class Auth {
  private http = inject(HttpClient);

  login(usuario: string, password: string) {
    return this.http
      .post<RespuestaLogin>(`${environment.apiUrl}/auth/login`, { usuario, password })
      .pipe(tap((respuesta) => localStorage.setItem(CLAVE_TOKEN, respuesta.accessToken)));
  }

  logout() {
    localStorage.removeItem(CLAVE_TOKEN);
  }

  obtenerToken() {
    return localStorage.getItem(CLAVE_TOKEN);
  }

  estaAutenticado() {
    return this.obtenerToken() !== null;
  }
}
