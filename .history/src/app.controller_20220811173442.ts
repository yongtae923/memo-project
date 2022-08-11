import { AppService } from './app.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { Memo } from './schemas/memo.schema';
import { MemoDto } from './dto/memo.dto';
import { AccountDto } from './dto/account.dto';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('memos')
  async findAll(): Promise<Memo[]> {
    return this.appService.findAll();
  }

  @Get('memos/:id')
  async findOne(@Param('id') id: string): Promise<Memo> {
    return this.appService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('memos')
  async create(@Body() memoDto: MemoDto, @Request() request) {
    memoDto.authorId = request.user.accoundId;
    return await this.appService.create(memoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('memos/:id')
  async edit(
    @Param('id') id: string,
    @Body() memoDto: MemoDto,
    @Request() request,
  ) {
    return await this.appService.edit(id, memoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('memos/:id')
  async delete(@Param('id') id: string) {
    return this.appService.delete(id);
  }

  @Get('accounts')
  async accounts() {
    return await this.appService.accountAll();
  }

  @Post('accounts')
  async join(@Body() accountDto: AccountDto) {
    return await this.appService.join(accountDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() accountDto: AccountDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(accountDto);
  }
}
