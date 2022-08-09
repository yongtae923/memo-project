import { AppService } from './app.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Memo } from './schemas/memo.schema';

@Controller('memo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  async findAll(): Promise<Memo[]> {
    return this.appService.findAll();
  }
}
