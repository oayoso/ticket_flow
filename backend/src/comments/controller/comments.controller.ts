import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from '../service/comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { SendMessageDto } from '../dto/send-message.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateCommentDto, @Request() req) {
    return this.service.createComment(dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':ticketId')
  findByTicket(@Param('ticketId') ticketId: string) {
    return this.service.findComments(ticketId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/dm')
  sendDM(@Body() dto: SendMessageDto, @Request() req) {
    return this.service.sendMessage(dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/dm/:userId')
  findDM(@Param('userId') userId: string, @Request() req) {
    return this.service.findDirectMessages(req.user.id, userId);
  }
}
