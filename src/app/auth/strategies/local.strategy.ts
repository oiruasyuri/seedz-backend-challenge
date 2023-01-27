import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidateAuth } from '../use-cases/validate-auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly validateAuth: ValidateAuth) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.validateAuth.execute(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
