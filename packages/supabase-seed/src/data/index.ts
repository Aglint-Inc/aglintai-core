import fs from 'node:fs/promises';

export const getJsonRecords = async (
  table_name: 'recruiter' | 'recruiter_user'
) => {
  const json_str = await fs.readFile(`./src/data/${table_name}.json`, {
    encoding: 'utf8',
  });
  const parsed_json = JSON.parse(json_str);
  return parsed_json;
};
