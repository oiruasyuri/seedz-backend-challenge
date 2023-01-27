import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/app/auth/guards/local-auth.guard';
import { CreateAuth } from 'src/app/auth/use-cases/create-auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly createAuth: CreateAuth) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async auth(@Request() request) {
    return await this.createAuth.execute(request.user);
  }
}
