import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { GoogleCalender } from '@/services/GoogleCalender/google-calender';

type BodyParams = {
  event_id: string;
  organizer_id: string;
  status: string;
};

const updateCalenderEventStatus = async (req_body: BodyParams) => {
  const { organizer_id, event_id } = req_body as BodyParams;
  const google_cal = new GoogleCalender(null, null, organizer_id);
  await google_cal.authorizeUser();
  await google_cal.updateEventStatus(event_id, 'cancelled');
};

export default createPageApiPostRoute(null, updateCalenderEventStatus);
