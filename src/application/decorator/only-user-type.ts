import { applyDecorators, SetMetadata } from '@nestjs/common';

import { UserType } from '@/application/domain/constant/enums';

export const ONLY_USER_TYPES = 'only-user-types';
export const OnlyUserTypes = (...userType: UserType[]) => applyDecorators(SetMetadata(ONLY_USER_TYPES, userType));
