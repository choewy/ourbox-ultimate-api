import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UserType } from '@/application/domain/constant/enums';
import { FulfillmentCenter } from '@/application/domain/entity/fulfillment-center.entity';
import { Fulfillment } from '@/application/domain/entity/fulfillment.entity';
import { PartnerChannel } from '@/application/domain/entity/partner-channel.entity';
import { Partner } from '@/application/domain/entity/partner.entity';
import { User } from '@/application/domain/entity/user.entity';
import { FulfillmentCenterRepository } from '@/application/domain/repository/fulfillment-center.repository';
import { FulfillmentRepository } from '@/application/domain/repository/fulfillment.repository';
import { PartnerChannelRepository } from '@/application/domain/repository/partner-channel.repository';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';
import { UserRepository } from '@/application/domain/repository/user.repository';
import { PasswordVO } from '@/constant/vo/password.vo';

@Injectable()
export class TestingService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly partnerRepository: PartnerRepository,
    private readonly partnerChannelRepository: PartnerChannelRepository,
    private readonly fulfillmentRepository: FulfillmentRepository,
    private readonly fulfillmentCenterRepository: FulfillmentCenterRepository,
  ) {}

  async createData() {
    const fulfillments = this.createFulfillments();
    await this.fulfillmentRepository.upsert(fulfillments, { conflictPaths: { id: true } });

    const fulfillmentCenters = this.createFulfillmentCenters();
    await this.fulfillmentCenterRepository.upsert(fulfillmentCenters, { conflictPaths: { id: true } });

    const partners = this.createPartners();
    await this.partnerRepository.upsert(partners, { conflictPaths: { id: true } });

    const partnerChannels = this.createPartnerChannels();
    await this.partnerChannelRepository.upsert(partnerChannels, { conflictPaths: { id: true } });

    const users = this.createUsers();
    await this.userRepository.upsert(users, { conflictPaths: { id: true } });
  }

  private createFulfillments() {
    return new Array(5).fill(null).map((_, i) =>
      plainToInstance(Fulfillment, {
        id: i + 1,
        name: `풀필먼트(${i + 1})`,
      }),
    );
  }

  private createFulfillmentCenters() {
    const fulfillmentCenters: FulfillmentCenter[] = [];

    let id = 1;

    for (const fulfillment of this.createFulfillments()) {
      new Array(10).fill(null).forEach(() => {
        const code = `0000${String(id)}`.slice(-5);

        fulfillmentCenters.push(
          plainToInstance(FulfillmentCenter, {
            id,
            code,
            name: `풀필먼트 센터(${id})`,
            fulfillmentId: fulfillment.id,
          }),
        );

        id++;
      });
    }

    return fulfillmentCenters;
  }

  private createPartners() {
    return new Array(50).fill(null).map((_, i) =>
      plainToInstance(Partner, {
        id: i + 1,
        name: `고객사(${i + 1})`,
      }),
    );
  }

  private createPartnerChannels() {
    const partnerChannels: PartnerChannel[] = [];

    let id = 1;

    for (const partner of this.createPartners()) {
      new Array(10).fill(null).forEach(() => {
        partnerChannels.push(
          plainToInstance(PartnerChannel, {
            id,
            name: `고객사 판매 채널(${id})`,
            partnerId: partner.id,
          }),
        );

        id++;
      });
    }

    return partnerChannels;
  }

  private createUsers() {
    const password = new PasswordVO('password');

    let id = 2;

    const users: User[] = [];

    for (const partner of this.createPartners()) {
      new Array(1).fill(null).forEach(() => {
        users.push(
          plainToInstance(User, {
            id,
            type: UserType.PartnerAdmin,
            name: `고객사 관리자(${id})`,
            email: `partner_admin${id}@ultimate.com`,
            password,
            partnerId: partner.id,
          }),
        );

        id++;
      });
    }

    for (const partnerChannel of this.createPartnerChannels()) {
      new Array(10).fill(null).forEach(() => {
        users.push(
          plainToInstance(User, {
            id,
            type: UserType.PartnerUser,
            name: `고객사 사용자(${id})`,
            email: `partner_user${id}@ultimate.com`,
            password,
            partnerId: partnerChannel.partnerId,
            partnerChannelId: partnerChannel.id,
          }),
        );

        id++;
      });
    }

    for (const fulfillment of this.createFulfillments()) {
      new Array(1).fill(null).forEach(() => {
        users.push(
          plainToInstance(User, {
            id,
            type: UserType.FulfillmentAdmin,
            name: `풀필먼트 관리자(${id})`,
            email: `fuifillment_admin${id}@ultimate.com`,
            password,
            fulfillmentId: fulfillment.id,
          }),
        );

        id++;
      });
    }

    for (const fulfillmentCenter of this.createFulfillmentCenters()) {
      new Array(10).fill(null).forEach(() => {
        users.push(
          plainToInstance(User, {
            id,
            type: UserType.FulfillmentUser,
            name: `풀필먼트 사용자(${id})`,
            email: `fuifillment_user${id}@ultimate.com`,
            password,
            fulfillmentId: fulfillmentCenter.fulfillmentId,
            fulfillmentCenterId: fulfillmentCenter.id,
          }),
        );

        id++;
      });
    }

    return users;
  }
}
