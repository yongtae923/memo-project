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
import { Account } from './schemas/account.schema';
import { PostMemoDto } from './dto/post-memo.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
  async create(@Body() postMemoDto: PostMemoDto) {
    return await this.appService.create(postMemoDto);
  }

  @Put('memos/:id')
  async edit(@Param('id') id: string, @Body() postMemoDto: PostMemoDto) {
    return await this.appService.edit(id, postMemoDto);
  }

  @Delete('memos/:id')
  async delete(@Param('id') id: string) {
    return this.appService.delete(id);
  }

  @Post('accounts')
  async join(@Body() postAccountDto: PostAccontDto) {
    return await this.appService.create(postAccountDto);
  }
}
