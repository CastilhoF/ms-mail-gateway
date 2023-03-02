import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import CacheInterface from "./cache.interface";

@Injectable()
abstract class CacheEnvironment implements CacheInterface {
  constructor(protected readonly config: ConfigService) {}

  getCacheHost(): string {
    return this.config.get<string>('CACHE_HOST');
  }

  getCachePort(): number {
    return this.config.get<number>('CACHE_PORT');
  }

  getCacheTTL(): number {
    return this.config.get<number>('CACHE_TTL');
  }
}

export default CacheEnvironment;
