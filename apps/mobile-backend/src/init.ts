import minimist from 'minimist';
import dotenv from 'dotenv';

dotenv.config();

const runtime_args = minimist(process.argv.slice(2));
const HOST = process.env.HOST || 'http://localhost';
const PORT = runtime_args['port'] || process.env.POST || 8000;

export { HOST, PORT };
