import { VersioningOptions, VersioningType } from '@nestjs/common';

const versioningOptions = (): VersioningOptions => {
  return {
    prefix: 'v',
    type: VersioningType.URI,
  };
};

export default versioningOptions;
