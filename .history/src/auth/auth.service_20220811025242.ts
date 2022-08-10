import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(accoundId: string, pass: string): Promise<any> {
    const user = await this.usersService.accountOne(accoundId);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}