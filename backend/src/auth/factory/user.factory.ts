import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../dto/register.dto';
import { UserRepository } from '../repository/user.repository';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class UserFactory {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

  async createFromRegisterDto(dto: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = new User();
    user.name = dto.name;
    user.email = dto.email.toLowerCase();
    user.password = hashedPassword;
    user.role = dto.role;

    return user;
  }

  async validateLoginCredentials(dto: LoginDto) {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async createFromIdReciever(idReciever: string) {
    const receiver = await this.userRepository.findOneBy(idReciever);
    if (!receiver) throw new NotFoundException('Receiver not found');
    return receiver
  }

  async createFromId(id: string) {
    const receiver = await this.userRepository.findOneBy(id);
    if (!receiver) throw new NotFoundException('Agent not found');
    return receiver
  }
}
