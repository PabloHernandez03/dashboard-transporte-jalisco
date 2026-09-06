import { Component, inject, OnInit, signal } from '@angular/core';
import { Etup, EtupData, Filtros } from './etup';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
@Component({
  imports: [FormsModule, DecimalPipe, CurrencyPipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly etupService = inject(Etup);

  protected datos = signal<EtupData | null>(null);
  protected filtros = signal<Filtros | null>(null);
  protected anio = signal(2024);
  protected mesInicio = signal(1);
  protected mesFin = signal(12);
  protected transporte = signal("");
protected readonly meses = [
  { num: 1, nombre: "Enero" },
  { num: 2, nombre: "Febrero" },
  { num: 3, nombre: "Marzo" },
  { num: 4, nombre: "Abril" },
  { num: 5, nombre: "Mayo" },
  { num: 6, nombre: "Junio" },
  { num: 7, nombre: "Julio" },
  { num: 8, nombre: "Agosto" },
  { num: 9, nombre: "Septiembre" },
  { num: 10, nombre: "Octubre" },
  { num: 11, nombre: "Noviembre" },
  { num: 12, nombre: "Diciembre" },
];

  ngOnInit() {
    this.cargar();
    this.etupService.obtenerFiltros()
      .subscribe(respuesta => this.filtros.set(respuesta));
  }
  cargar() {
    this.etupService
      .obtenerEstadisticas(this.anio(), this.mesInicio(), this.mesFin(), this.transporte() || undefined)
      .subscribe( r => this.datos.set(r));
  }
}
