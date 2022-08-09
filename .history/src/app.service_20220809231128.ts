import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Memo, MemoDocument } from './schemas/memo.schema';
@Injectable()
export class AppService {
  constructor(
    @InjectModel(Memo.name) private readonly memoModel: Model<CatDocument>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<Memo[]> {
    return this.memoModel.find().exec();
  }
}
