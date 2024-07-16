import {DatabaseTable} from '@aglint/shared-types';
import fs from 'node:fs/promises';

export const getJsonRecords = async <T extends keyof DatabaseTable>(
  table_name: T | 'auth_users'
) => {
  const json_str = await fs.readFile(`./src/data/${table_name}.json`, {
    encoding: 'utf8',
  });
  const parsed_json = JSON.parse(json_str);
  return parsed_json as DatabaseTable[T][];
};
