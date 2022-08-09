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

  async findOne(id: string): Promise<Memo> {
    return this.memoModel.findOne({ _id: id }).exec();
  }

  async create(PostMemoDto: PostMemoDto): Promise<Memo> {
    const createdMemo = await this.memoModel.create(PostMemoDto);
    return createdMemo;
  }

  async edit(id: string, content: string): Promise<Memo> {
    const a = await this.memoModel.findOne({ _id: id})
  }
}
