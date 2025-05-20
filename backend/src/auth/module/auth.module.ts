import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';
import { UserFactory } from '../factory/user.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserRepository, UserFactory
  ],
  exports: [AuthService, UserRepository, UserFactory],
})
export class AuthModule {}
