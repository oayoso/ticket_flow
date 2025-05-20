import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/module/auth.module';
import { User } from './auth/entities/user.entity';
import { TicketsModule } from './tickets/module/tickets.module';
import { Ticket } from './tickets/entities/ticket.entity';
import { CommentsModule } from './comments/module/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { Message } from './comments/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydb',
      entities: [User, Ticket, Comment, Comment, Message],
      synchronize: true,
    }),
    AuthModule,
    TicketsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
