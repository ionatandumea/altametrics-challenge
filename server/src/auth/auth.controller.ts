import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Request as ExpressRequest } from 'express';
import type { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';

interface AuthenticatedRequest extends ExpressRequest {
  user: User;
  logout: () => void;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }
}
