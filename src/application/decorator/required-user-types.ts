import { applyDecorators, SetMetadata } from '@nestjs/common';

import { UserType } from '@/application/domain/constant/enums';

export const REQUIRED_USER_TYPES = 'required-user-types';
export const RequiredUserTypes = (...userTypes: UserType[]) => applyDecorators(SetMetadata(REQUIRED_USER_TYPES, userTypes));
