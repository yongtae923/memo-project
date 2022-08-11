import * as common from '@nestjs/common';
import { AppService } from './app.service';
import { Memo } from './schemas/memo.schema';
import { MemoDto } from './dto/memo.dto';
import { AccountDto } from './dto/account.dto';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@common.Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @common.Get('api/memo')
  async findAll(): Promise<Memo[]> {
    return this.appService.findAll();
  }

  @common.Get('api/memo/:id')
  async findOne(@common.Param('id') id: string): Promise<Memo> {
    return this.appService.findOne(id);
  }

  @common.UseGuards(JwtAuthGuard)
  @common.Post('api/memo')
  async create(@common.Body() memoDto: MemoDto, @common.Request() request) {
    memoDto.authorId = request.user.accountId;
    return await this.appService.create(memoDto);
  }

  @common.UseGuards(JwtAuthGuard)
  @common.Put('api/memo/:id')
  async edit(
    @common.Param('id') id: string,
    @common.Body() memoDto: MemoDto,
    @common.Request() request,
  ) {
    const memo = await this.appService.findOne(id);
    if (request.user.accountId != memo.authorId) {
      throw new common.ForbiddenException();
    }
    return await this.appService.edit(id, memoDto);
  }

  @common.UseGuards(JwtAuthGuard)
  @common.Delete('api/memo/:id')
  async delete(@common.Param('id') id: string, @common.Request() request) {
    const memo = await this.appService.findOne(id);
    if (request.user.accountId != memo.authorId) {
      throw new common.ForbiddenException();
    }
    return this.appService.delete(id);
  }

  @common.Get('api/auth')
  async accounts() {
    return await this.appService.accountAll();
  }

  @common.Post('api/auth/join')
  async join(@common.Body() accountDto: AccountDto) {
    return await this.appService.join(accountDto);
  }

  @common.UseGuards(LocalAuthGuard)
  @common.Post('api/auth/login')
  async login(
    @common.Body() accountDto: AccountDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(accountDto);
  }

  async deleteAccounts() {
    return await this.appService.
  }
}
