import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Memo, MemoSchema } from './schemas/memo.schema';
import { Account, AccountSchema } from './schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://yongtae:yongtae@cluster0.4jd66xe.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: Memo.name, schema: MemoSchema }]),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
