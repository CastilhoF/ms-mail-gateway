import { Module } from '@nestjs/common';
import apiKeyGeneratorProvider from './providers/api-key-generator.provider';
import apiSecretHasherProvider from './providers/api-secret-hasher.provider';
import uidGeneratorProvider from './providers/uid-generator.provider';

@Module({
  providers: [
    apiKeyGeneratorProvider,
    apiSecretHasherProvider,
    uidGeneratorProvider,
  ],
  exports: [
    apiKeyGeneratorProvider,
    apiSecretHasherProvider,
    uidGeneratorProvider,
  ],
})
export default class CryptographyModule {}
