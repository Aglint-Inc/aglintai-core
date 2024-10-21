import { createCompanyAndAdmin } from './lib/createCompanyAndAdmin';
import dotenv from 'dotenv';
dotenv.config();
const main = async () => {
  await createCompanyAndAdmin();
};

main();
