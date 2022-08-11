import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'accountId',
    });
  }

  async validate(accountId: string, password: string): Promise<any> {
    const accountDto = {}
    const user = await this.authService.validateUser(accountId, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
