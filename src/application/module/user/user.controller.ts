import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreateUserDTO } from '@/application/dto/request/create-user.dto';
import { GetUserListParamDTO } from '@/application/dto/request/get-user-list-param.dto';
import { IdParamDTO } from '@/application/dto/request/id-param.dto';
import { UpdateUserDTO } from '@/application/dto/request/update-user.dto';
import { UserListDTO } from '@/application/dto/response/user-list.dto';
import { UserDTO } from '@/application/dto/response/user.dto';
import { ApiException } from '@/common/swagger/decorator';
import { ExcelFileDTO } from '@/constant/dto/excel-file.dto';

@ApiTags('사용자')
@RequiredAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('list')
  @ApiOperation({ summary: '사용자 목록 조회' })
  @ApiOkResponse({ type: UserListDTO })
  @ApiException()
  async getUserList(@Body() body: GetUserListParamDTO) {
    return this.userService.getUserList(body);
  }

  @Post('excel')
  @ApiOperation({ summary: '사용자 목록 엑셀 다운로드' })
  @ApiOkResponse({ type: ExcelFileDTO })
  @ApiException()
  async downLoadUserListToExcel(@Body() body: GetUserListParamDTO) {
    return this.userService.downloadUserListToExcel(body);
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '사용자 정보 조회' })
  @ApiOkResponse({ type: UserDTO })
  @ApiException()
  async getUserById(@Param() param: IdParamDTO) {
    return this.userService.getUserById(param);
  }

  @Post()
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.FulfillmentAdmin)
  @ApiOperation({ summary: '사용자 계정 생성' })
  @ApiCreatedResponse()
  @ApiException(HttpStatus.CONFLICT)
  async createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.FulfillmentAdmin)
  @ApiOperation({ summary: '사용자 계정 수정' })
  @ApiException()
  async updateUser(@Param() param: IdParamDTO, @Body() body: UpdateUserDTO) {
    return this.userService.updateUser(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.FulfillmentAdmin)
  @ApiOperation({ summary: '사용자 계정 삭제' })
  @ApiException()
  async deleteUser(@Param() param: IdParamDTO) {
    return this.userService.deleteUser(param.id);
  }
}
