import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Etup, EtupData, Filtros } from '../etup';
import { Auth } from '../auth';

@Component({
  imports: [FormsModule, DecimalPipe, CurrencyPipe],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly etupService = inject(Etup);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  protected datos = signal<EtupData | null>(null);
  protected filtros = signal<Filtros | null>(null);
  protected anio = signal(2024);
  protected mesInicio = signal(1);
  protected mesFin = signal(12);
  protected transporte = signal('');
  protected cargando = signal(false);

  protected readonly meses = [
    { num: 1, nombre: 'Enero' },
    { num: 2, nombre: 'Febrero' },
    { num: 3, nombre: 'Marzo' },
    { num: 4, nombre: 'Abril' },
    { num: 5, nombre: 'Mayo' },
    { num: 6, nombre: 'Junio' },
    { num: 7, nombre: 'Julio' },
    { num: 8, nombre: 'Agosto' },
    { num: 9, nombre: 'Septiembre' },
    { num: 10, nombre: 'Octubre' },
    { num: 11, nombre: 'Noviembre' },
    { num: 12, nombre: 'Diciembre' },
  ];

  ngOnInit() {
    this.cargar();
    this.etupService.obtenerFiltros().subscribe({
      next: (respuesta) => this.filtros.set(respuesta),
      error: (e) => this.manejarError(e),
    });
  }

  cargar() {
    this.cargando.set(true);
    this.etupService
      .obtenerEstadisticas(
        Number(this.anio()),
        Number(this.mesInicio()),
        Number(this.mesFin()),
        this.transporte() || undefined,
      )
      .subscribe({
        next: (respuesta) => {
          this.datos.set(respuesta);
          this.cargando.set(false);
        },
        error: (e) => {
          this.cargando.set(false);
          this.manejarError(e);
        },
      });
  }

  salir() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private manejarError(error: { status?: number }) {
    if (error?.status === 401) {
      this.salir();
    }
  }
}
