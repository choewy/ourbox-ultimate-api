import { applyDecorators, SetMetadata } from '@nestjs/common';

import { UserType } from '@/application/domain/constant/enums';

export const ONLY_USER_TYPE = 'only-user-type';
export const OnlyUserType = (userType: UserType) => applyDecorators(SetMetadata(ONLY_USER_TYPE, userType));
