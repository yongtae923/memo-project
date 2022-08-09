import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostMemoDto } from './dto/post-memo.dto';
import { Memo, MemoDocument } from './schemas/memo.schema';
@Injectable()
export class AppService {
  constructor(
    @InjectModel(Memo.name) private readonly memoModel: Model<MemoDocument>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<Memo[]> {
    return this.memoModel.find().exec();
  }

  async create(PostMemoDto: PostMemoDto): Promise<Memo> {
    const createdCat = await this.memoModel.create(createCatDto);
    return createdCat;
  }
}
