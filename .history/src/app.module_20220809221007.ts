import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
  MongooseModule.forRoot('mongodb+srv://yongtae:<password>@cluster0.4jd66xe.mongodb.net/?retryWrites=true&w=majority')
})
export class AppModule {}
