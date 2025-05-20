import { IsUUID, IsNotEmpty } from 'class-validator';

export class SendMessageDto {
  @IsUUID()
  receiverId: string;

  @IsNotEmpty()
  content: string;
}
