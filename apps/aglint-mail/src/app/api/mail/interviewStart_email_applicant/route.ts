import { sendAglintMail } from '../../../../utils/aglint-mails';
import { createPostRoute } from '../../../../utils/apiUtils/createPostRoute';

export const POST = createPostRoute(null, sendAglintMail);
