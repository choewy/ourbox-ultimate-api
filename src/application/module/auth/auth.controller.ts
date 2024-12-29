import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { SignInWithOtherDTO } from '@/application/dto/request/signin-with-other.dto';
import { SignInDTO } from '@/application/dto/request/signin.dto';
import { AuthDTO } from '@/application/dto/response/auth.dto';
import { JwtDTO } from '@/application/dto/response/jwt.dto';
import { ApiException } from '@/common/swagger/decorator';

@ApiTags('인증/인가')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @RequiredAuth()
  @ApiOperation({ summary: '인가' })
  @ApiOkResponse({ type: AuthDTO })
  @ApiException()
  async auth() {
    return this.authService.auth();
  }

  @Post('signin')
  @ApiOperation({ summary: '로그인' })
  @ApiCreatedResponse({ type: JwtDTO })
  @ApiException()
  async signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO);
  }

  @Post('signin/other')
  @RequiredAuth()
  @ApiOperation({ summary: '다른 계정으로 로그인' })
  @ApiCreatedResponse({ type: JwtDTO })
  @ApiException(HttpStatus.NOT_FOUND)
  async signInWithOther(@Body() body: SignInWithOtherDTO) {
    return this.authService.signInWithOther(body);
  }
}
