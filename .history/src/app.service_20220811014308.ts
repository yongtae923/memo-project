import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemoDto } from './dto/memo.dto';
import { AccountDto } from './dto/account.dto';
import { Memo, MemoDocument } from './schemas/memo.schema';
import { Account, AccountDocument } from './schemas/account.schema';
@Injectable()
export class AppService {
  constructor(
    @InjectModel(Memo.name) private readonly memoModel: Model<MemoDocument>,
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
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

  async create(memoDto: MemoDto): Promise<Memo> {
    const createdMemo = await this.memoModel.create(memoDto);
    return createdMemo;
  }

  async edit(id: string, postMemoDto: MemoDto): Promise<Memo> {
    const updatedMemo = await this.memoModel
      .findByIdAndUpdate(id, postMemoDto)
      .exec();
    return updatedMemo;
  }

  async delete(id: string) {
    const deletedMemo = await this.memoModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedMemo;
  }

  async join(accountDto: AccountDto): Promise<Account> {
    const isExist = await this.accountModel.findOne({
      userId: accountDto.id,
    });
    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 등록된 사용자입니다.`],
        error: 'Forbidden',
      });
    }

    const { password, ...result } = await this.accountModel.create(accountDto);
    return result;
    const createdMemo = await this.accountModel.create(accountDto);
    return createdMemo;
  }
}
