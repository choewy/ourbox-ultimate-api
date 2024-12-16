import { Module } from '@nestjs/common';

import { AuthModule } from './module/auth/auth.module';
import { PartnerModule } from './module/partner/partner.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [AuthModule, UserModule, PartnerModule],
})
export class ApplicationModule {}
