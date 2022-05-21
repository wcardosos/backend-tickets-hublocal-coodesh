import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<boolean> {
    return true;
  }
}
