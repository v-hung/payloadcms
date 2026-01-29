import * as migration_20260129_020704_init from './20260129_020704_init';

export const migrations = [
  {
    up: migration_20260129_020704_init.up,
    down: migration_20260129_020704_init.down,
    name: '20260129_020704_init'
  },
];
