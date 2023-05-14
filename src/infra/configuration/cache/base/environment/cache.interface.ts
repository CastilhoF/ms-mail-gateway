interface CacheInterface {
  getCacheHost(): string;
  getCachePort(): number;
  getCachePassword(): string;
  getCacheTTL(): number;
}

export default CacheInterface;
