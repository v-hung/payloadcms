import * as migration_20260126_031033_init from './20260126_031033_init';

export const migrations = [
  {
    up: migration_20260126_031033_init.up,
    down: migration_20260126_031033_init.down,
    name: '20260126_031033_init'
  },
];
