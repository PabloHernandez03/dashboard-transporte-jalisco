import { Component, inject, OnInit, signal } from '@angular/core';
import { Etup, EtupData } from './etup';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [JsonPipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly etupService = inject(Etup);

  protected datos = signal<EtupData | null>(null);

  ngOnInit() {
    this.etupService.obtenerEstadisticas(2023, 1, 12, 'Trolebús')
      .subscribe(respuesta => this.datos.set(respuesta));
  }
}
