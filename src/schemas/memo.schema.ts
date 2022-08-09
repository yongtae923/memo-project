import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MemoDocument = Memo & Document;

@Schema()
export class Memo {
  @Prop()
  id: string;

  @Prop()
  authorId: string;

  @Prop()
  content: string;
}

export const MemoSchema = SchemaFactory.createForClass(Memo);
