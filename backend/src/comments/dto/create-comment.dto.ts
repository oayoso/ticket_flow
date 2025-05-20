import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  ticketId: string;

  @IsNotEmpty()
  content: string;
}
