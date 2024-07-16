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

  const promises = seed_data.map(async rec => {
    const [new_row] = supabaseWrap(
      await supabaseAdmin
        .from(table_name)
        .insert({
          ...rec,
        })
        .select()
    );

    return new_row;
  });
  const new_rows = await Promise.all(promises);
  console.log(`created ${table_name}`, new_rows.length);
  return new_rows;
};
