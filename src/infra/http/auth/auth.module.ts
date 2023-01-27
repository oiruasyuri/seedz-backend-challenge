import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/app/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/app/auth/strategies/local.strategy';
import { CreateAuth } from 'src/app/auth/use-cases/create-auth';
import { ValidateAuth } from 'src/app/auth/use-cases/validate-auth';
import { jwtConstants } from 'src/helpers/jwt-constants';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [ValidateAuth, CreateAuth, LocalStrategy, JwtStrategy],
  exports: [CreateAuth],
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' /* ONE_HOUR_IN_SECONDS */ },
    }),
  ],
})
export class AuthModule {}
