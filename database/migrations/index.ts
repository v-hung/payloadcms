import * as migration_20260128_040851_init from './20260128_040851_init';

export const migrations = [
  {
    up: migration_20260128_040851_init.up,
    down: migration_20260128_040851_init.down,
    name: '20260128_040851_init'
  },
];
