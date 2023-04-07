import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { IAuthModuleOptions } from '@nestjs/passport';

export const jwtConfigOptions: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get('JWT_EXPIRATION_TIME'),
      },
    };
  },
};

export const configStrategy: IAuthModuleOptions = { defaultStrategy: 'jwt' };
