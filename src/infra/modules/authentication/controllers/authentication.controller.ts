import {
  Controller,
  ClassSerializerInterceptor,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticateClientInputDto } from '../dtos/authenticate-client-input.dto';
import { AuthenticateClientOutputDto } from '../dtos/authenticate-client-output.dto';
import AuthenticationService from '../services/authentication.service';
import SignIn from '../documentation/sign-in.documentation';

@Controller({ path: 'authentication', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  // Authenticate a client with the given API Key and API Secret
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @SignIn.Doc()
  async authenticateClient(
    @Body() authenticateClientInputDto: AuthenticateClientInputDto,
  ): Promise<AuthenticateClientOutputDto> {
    return await this.authenticationService.signIn(authenticateClientInputDto);
  }
}

export default AuthenticationController;
