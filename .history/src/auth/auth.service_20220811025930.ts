import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(accountId: string, pass: string): Promise<any> {
    const user = await this.usersService.accountOne(accountId);
    if (user && user.password === pass) {
      const { , ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { accountId: user.accountId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
