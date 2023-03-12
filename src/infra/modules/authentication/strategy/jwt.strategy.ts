import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import ClientRepository from '../../../../app/repositories/client/client.repository';
import { JwtPayloadInterface } from '../../../../app/shared/interfaces/jwt-payload.interface';
import AuthenticationEnvironment from '../../../configuration/authentication/authentication.environment';
