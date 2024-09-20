import {DatabaseTable, DB} from '@aglint/shared-types';
import {supabaseWrap} from '@aglint/shared-utils';
import {getJsonRecords} from 'src/data';
import {supabaseAdmin} from 'src/supabase/SupabaseAdmin';

export const seedCommonTable = async (
  table_name: keyof DatabaseTable,
  primary_key = 'id'
) => {
  const seed_data = await getJsonRecords(table_name);

  supabaseWrap(
    await supabaseAdmin.from(table_name).delete().not(primary_key, 'is', null)
  );

  const {data: new_rows} = await supabaseAdmin
    .from(table_name)
    .insert(seed_data)
    .select()
    .throwOnError();

  console.log(`created ${table_name}`, new_rows.length);
  return new_rows;
};
