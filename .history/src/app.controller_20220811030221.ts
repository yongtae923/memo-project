import { AppService } from './app.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Memo } from './schemas/memo.schema';
import { MemoDto } from './dto/memo.dto';
import { AccountDto } from './dto/account.dto';
import { Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService;
    private readonly authService: AuthServicey) {}

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

  @Post('memos')
  async create(@Body() postMemoDto: MemoDto) {
    return await this.appService.create(postMemoDto);
  }

  @Put('memos/:id')
  async edit(@Param('id') id: string, @Body() postMemoDto: MemoDto) {
    return await this.appService.edit(id, postMemoDto);
  }

  @Delete('memos/:id')
  async delete(@Param('id') id: string) {
    return this.appService.delete(id);
  }

  @Get('accounts')
  async accounts() {
    return await this.appService.accountAll();
  }

  @Post('accounts')
  async join(@Body() postAccountDto: AccountDto) {
    return await this.appService.join(postAccountDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
