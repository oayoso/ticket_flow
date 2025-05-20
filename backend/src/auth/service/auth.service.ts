import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { UserRepository } from '../repository/user.repository';
import { UserFactory } from '../factory/user.factory';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly userFactory: UserFactory
    ) {}

    async register(dto: RegisterDto) {
      const exists = await this.userRepository.findByEmail(dto.email);
      if (exists) throw new ConflictException('Email already registered');
  
      const user = await this.userFactory.createFromRegisterDto(dto);
      await this.userRepository.create(user);
      return { message: 'User registered successfully' };
    }
  
    async login(dto: LoginDto) {
      const user = await this.userFactory.validateLoginCredentials(dto);
      const payload = { sub: user.id, email: user.email, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  
    async findById(id: string): Promise<User | null> {
      return this.userRepository.findById(id);
    }
}
