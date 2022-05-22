import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService, IUserData } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<IUserData> {
    const validUser = await this.authService.validateUser(username, password);

    if (!validUser) {
      throw new UnauthorizedException();
    }

    return validUser;
  }
}
