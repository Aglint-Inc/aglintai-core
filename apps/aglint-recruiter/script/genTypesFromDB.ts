'use client';
import { createBrowserClient } from '@supabase/ssr';
import { config } from 'dotenv';
import { writeFileSync } from 'fs';
import * as path from 'path';

config();

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

function writeToFile(path: string, data: any) {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  writeFileSync(path, data, 'utf-8');
}

async function generatePermissions() {
  return (await supabase.from('permissions').select('name').throwOnError())
    .data;
}

const permissionsOutputPath = path.join(
  '../../packages/shared-types/src/db/tables/permissions',
  'type.ts',
);
generatePermissions().then(
  (data) =>
    data.length &&
    writeToFile(
      permissionsOutputPath,
      `export type permissionsEnum = \n${data.map((item) => "| '" + item.name + "'").join('\n')}`,
    ),
);
