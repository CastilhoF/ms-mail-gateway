import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSenderInputDto } from '../dtos/create-sender-input.dto';
import { DefaultSenderDto } from '../dtos/default-sender.dto';
import { FindManyInputDto } from '../dtos/find-many-input.dto';
import { FindManyOutputDto } from '../dtos/find-many-output.dto';
import CreateSender from '../documentation/create-sender.documentation';
import DeleteSender from '../documentation/delete-sender.documentation';
import GetAllSenders from '../documentation/find-all-senders.documentation';
import FindManySenders from '../documentation/find-many-senders.documentation';
import FindSenderByClientUid from '../documentation/find-sender-by-client-uid.documentation';
import ChangeSenderValidation from '../documentation/change-sender-validation.documentation';
import PatchSender from '../documentation/patch-sender.documentation';
import SenderService from '../services/sender.service';

@Controller({ path: 'sender', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
class SenderController {
  constructor(private readonly senderService: SenderService) {}

  // Create a new sender
  @Post('create-sender')
  @HttpCode(HttpStatus.CREATED)
  @CreateSender.Doc()
  async createSender(
    @Body() createSenderInputDto: CreateSenderInputDto,
  ): Promise<DefaultSenderDto> {
    return await this.senderService.createSender(createSenderInputDto);
  }

  // Delete a sender with the given UID
  @Delete('delete-sender/:uid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteSender.Doc()
  async deleteSender(@Param('uid') uid: string): Promise<void> {
    return await this.senderService.deleteSender(uid);
  }

  // Find all senders
  @Get('find-all-senders')
  @HttpCode(HttpStatus.OK)
  @GetAllSenders.Doc()
  async findAllSenders(): Promise<DefaultSenderDto[]> {
    return await this.senderService.findAllSenders();
  }

  // Find multiple senders that match the given criteria
  @Post('find-many-senders')
  @HttpCode(HttpStatus.OK)
  @FindManySenders.Doc()
  async findManySenders(
    @Body() findManyInputDto: FindManyInputDto,
  ): Promise<FindManyOutputDto> {
    return await this.senderService.findManySenders(findManyInputDto);
  }

  // Find a sender by its client UID
  @Get('find-sender-by-client-uid/:uid')
  @HttpCode(HttpStatus.OK)
  @FindSenderByClientUid.Doc()
  async findSenderByClientUid(
    @Param('uid') clientUid: string,
  ): Promise<DefaultSenderDto> {
    return await this.senderService.findSenderByClientUid(clientUid);
  }

  // Change the validation status of a sender
  @Patch('change-sender-validation/:uid')
  @HttpCode(HttpStatus.OK)
  @ChangeSenderValidation.Doc()
  async changeSenderValidation(
    @Param('uid') uid: string,
    @Body() input: Partial<DefaultSenderDto>,
  ): Promise<DefaultSenderDto> {
    input.uid = uid;
    return await this.senderService.changeSenderValidated(input);
  }

  // Patch a sender
  @Patch('patch-sender/:uid')
  @HttpCode(HttpStatus.OK)
  @PatchSender.Doc()
  async patchSender(
    @Param('uid') uid: string,
    @Body() input: Partial<DefaultSenderDto>,
  ): Promise<DefaultSenderDto> {
    if (!uid) throw new BadRequestException('UID is required');
    input.uid = uid;
    return await this.senderService.patchSender(input);
  }
}

export default SenderController;
