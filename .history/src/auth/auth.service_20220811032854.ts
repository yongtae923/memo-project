import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { AccountDto } from 'src/dto/account.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(accountId: string, pass: string): Promise<any> {
    const user = await this.appService.accountOne(accountId);
    const hash = createHash('sha512').update(pass).digest('hex');
    if (user && user.password === hash) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(accountDto: AccountDto) {
    if ()
    const payload = { accountId: accountDto.accountId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
