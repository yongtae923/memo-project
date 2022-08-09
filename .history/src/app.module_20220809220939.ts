import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
  MongooseModule.forRoot('mongodb://localhost:27017/test')
})
export class AppModule {}
