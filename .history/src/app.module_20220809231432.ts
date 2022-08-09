import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Memo, MemoSchema } from './schemas/memo.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://yongtae:yongtae@cluster0.4jd66xe.mongodb.net/?retryWrites=true&w=majority',
    ),
    mongom
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
