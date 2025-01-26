import { UserStatus, UserType } from '@/application/domain/constant/enums';

export const toUserTypeText = (userType: UserType) => {
  switch (userType) {
    case UserType.Admin:
      return '통합관리자';

    case UserType.PartnerAdmin:
      return '고객사 관리자';

    case UserType.PartnerUser:
      return '고객사 사용자';

    case UserType.FulfillmentAdmin:
      return '풀필먼트 관리자';

    case UserType.FulfillmentUser:
      return '풀필먼트 사용자';
  }
};

export const toUserStatusText = (userStatus: UserStatus) => {
  switch (userStatus) {
    case UserStatus.Activated:
      return '사용';

    case UserStatus.Disabled:
      return '차단';
  }
};
