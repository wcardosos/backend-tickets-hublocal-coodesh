import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HashManager } from '../lib/HashManager';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return false;
    }

    const { password: hashedPassword } = user;

    const isCorrectPassword = await HashManager.compare(
      password,
      hashedPassword,
    );

    return isCorrectPassword;
  }
}
