import { ConflictException, Injectable } from '@nestjs/common';

import { UserType } from '@/application/domain/constant/enums';
import { UserRepository } from '@/application/domain/repository/user.repository';
import { CreateUserDTO } from '@/application/dto/request/create-user.dto';
import { PasswordVO } from '@/constant/vo/password.vo';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDTO: CreateUserDTO) {
    if (await this.userRepository.hasEmail(createUserDTO.email)) {
      throw new ConflictException();
    }

    await this.userRepository.insert({
      type: UserType.User,
      email: createUserDTO.email,
      password: new PasswordVO(createUserDTO.password),
      name: createUserDTO.name,
    });
  }
}
