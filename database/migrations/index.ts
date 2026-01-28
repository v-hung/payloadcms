import * as migration_20260128_040851_init from './20260128_040851_init';
import * as migration_20260128_100803_init2 from './20260128_100803_init2';

export const migrations = [
  {
    up: migration_20260128_040851_init.up,
    down: migration_20260128_040851_init.down,
    name: '20260128_040851_init',
  },
  {
    up: migration_20260128_100803_init2.up,
    down: migration_20260128_100803_init2.down,
    name: '20260128_100803_init2'
  },
];
