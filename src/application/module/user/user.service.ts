import { Injectable } from '@nestjs/common';

import { UserRepository } from '@/application/domain/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}
