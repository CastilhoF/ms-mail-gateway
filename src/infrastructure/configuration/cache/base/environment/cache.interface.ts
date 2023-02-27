interface CacheInterface {
  getCacheHost(): string;
  getCachePort(): number;
  getCacheTTL(): number;
}

export default CacheInterface;
