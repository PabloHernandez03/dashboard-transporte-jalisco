import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  protected usuario = signal('');
  protected password = signal('');
  protected error = signal('');
  protected cargando = signal(false);

  entrar() {
    this.error.set('');
    this.cargando.set(true);

    this.auth.login(this.usuario(), this.password()).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.error.set('Usuario o contraseña incorrectos');
        this.cargando.set(false);
      },
    });
  }
}
