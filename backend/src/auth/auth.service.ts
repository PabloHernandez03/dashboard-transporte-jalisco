import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(usuario: string, password: string) {
    const usuarioEsperado = this.configService.get<string>('AUTH_USER');
    const hashEsperado = this.configService.get<string>('AUTH_PASSWORD_HASH');

    if (!usuarioEsperado || !hashEsperado) {
      throw new UnauthorizedException('Autenticacion no configurada');
    }

    const passwordValido = await compare(password, hashEsperado);

    if (usuario !== usuarioEsperado || !passwordValido) {
      throw new UnauthorizedException('Usuario o contrasena incorrectos');
    }

    const token = await this.jwtService.signAsync({ sub: usuario });

    return { accessToken: token, usuario };
  }
}
