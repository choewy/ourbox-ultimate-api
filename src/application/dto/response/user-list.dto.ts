import { UserDTO } from './user.dto';
import { ListBuilder } from '../builder/list.builder';

import { User } from '@/application/domain/entity/user.entity';

export class UserListDTO extends ListBuilder<User, UserDTO>(UserDTO) {}
