import {seedAuthUsers} from './utils/seedAuthUsers';

const main = async () => {
  const auth_users = await seedAuthUsers();
  console.log(auth_users);
};

main();
