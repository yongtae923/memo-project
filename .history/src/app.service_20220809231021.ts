import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
