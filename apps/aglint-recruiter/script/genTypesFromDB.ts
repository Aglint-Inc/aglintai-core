'use client';
// import { type DatabaseTable, type DB } from '@aglint/shared-types';
import { createBrowserClient } from '@supabase/ssr';
import { config } from 'dotenv';
import * as path from 'path';

import { deleteJsFilesInDir, writeToFile } from './utils';

config();

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

// Define a type for an array of table-column mappings

const reqTypes = [
  {
    table: 'permissions',
    column: 'name',
    outputPath: path.join(
      '../../packages/shared-types/src/db/tables/', //path till table folder
      'permissions/type.ts', // path till file
    ),
    as: 'permissionsEnum',
  },
];

async function generateTypesAndSaveToFile() {
  for (const item of reqTypes) {
    const typesValues = [];
    new Set(
      (
        await supabase.from(item.table).select(item.column).throwOnError()
      ).data.map((row) => String(row[item.column])),
    ).forEach((item) => typesValues.push(item));
    typesValues.sort();
    if (typesValues?.length) {
      writeToFile(
        item.outputPath,
        `export type ${item.as || `${item.column}Type`} = \n${typesValues.map((row) => "| '" + row + "'").join('\n')}`,
      );
    }
  }
}
generateTypesAndSaveToFile();
deleteJsFilesInDir(__dirname);

// type TableColType = {
//   [Table in keyof DatabaseTable]: {
//     [Key in keyof DatabaseTable[Table]]: {
//       table: Table;
//       column: Key;
//     };
//   }[keyof DatabaseTable[Table]];
// }[keyof DatabaseTable];

// type requiredTableType = (TableColType & {
//   outputPath: string;
//   include?: string[];
//   exclude?: string[];
// })[];
