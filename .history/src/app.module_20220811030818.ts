import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Memo, MemoSchema } from './schemas/memo.schema';
import { Account, AccountSchema } from './schemas/account.schema';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://yongtae:yongtae@cluster0.4jd66xe.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: Memo.name, schema: MemoSchema }]),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],

  imports: [
    AppModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AppModule {}
