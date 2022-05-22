import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HashManager } from '../lib/HashManager';
import { JwtService } from '@nestjs/jwt';

export interface IUserData {
  id: string;
  name: string;
  username: string;
}
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<IUserData | null> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return null;
    }

    const { password: hashedPassword, ...userData } = user;

    const isCorrectPassword = await HashManager.compare(
      password,
      hashedPassword,
    );

    return isCorrectPassword ? userData : null;
  }

  login(user: IUserData): string {
    const { id, username } = user;
    const payload = {
      username,
      sub: id,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }
}
