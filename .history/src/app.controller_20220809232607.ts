import { AppService } from './app.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Memo } from './schemas/memo.schema';
import { PostMemoDto } from './dto/post-memo.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('memos')
  async GetAll(): Promise<Memo[]> {
    return this.appService.findAll();
  }

  @Post()
  async create(@Body() postMemoDto: PostMemoDto) {
    await this.catsService.create(createCatDto);
  }
}
