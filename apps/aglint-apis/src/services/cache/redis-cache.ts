import {createClient} from 'redis';

export const client = createClient({
  password: 'd7xayQOnCMLb9vbi81j2o4eQJyrFKz2E',
  socket: {
    host: 'redis-15201.c12.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 15201,
  },
});
