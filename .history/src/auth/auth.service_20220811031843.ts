import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(accountId: string, pass: string): Promise<any> {
    const user = await this.appService.accountOne(accountId);
    const hash = createHash('sha512')
    .update(accountDto.password)
    .digest('hex');
    if (user && user.password === pass) {
      const { password, ...result } = user;
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
