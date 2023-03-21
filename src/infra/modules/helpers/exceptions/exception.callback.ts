import DomainException from '../../../../domain/entities/shared/exceptions/domain.exception';
import {
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException as NotFoundExceptionNest,
  Logger,
} from '@nestjs/common';
import DatabaseNotFoundException from '../../database/exceptions/database-not-found.exception';
import NotFoundException from '../../../../app/repositories/exceptions/not-found.exception';

const logger: Logger = new Logger('Error Callback');

export const errorCallback = (error) => {
  if (error instanceof DomainException) {
    if (error.message === 'User is not active') {
      logger.error('User not activated!');
      throw new UnauthorizedException('Not authorized - User not activated!');
    }
    logger.error('Bad request!', error.message);
    throw new BadRequestException(error.message);
  }

  if (
    error instanceof DatabaseNotFoundException ||
    error instanceof NotFoundException
  ) {
    logger.error('Not found!', error.message);
    throw new NotFoundExceptionNest(error.message);
  }

  logger.error(error.message);
  logger.debug(error.stack);
  throw new InternalServerErrorException(error.message);
};
