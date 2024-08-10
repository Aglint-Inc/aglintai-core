import { NextResponse } from 'next/server';

// import { settings } from './utils/constants';
import { fetchTodoRequests } from './utils/fetchRequests';
import { updateRequestStatus } from './utils/updateRequestStatus';

export async function GET() {
  try {
    const requests: Awaited<ReturnType<typeof fetchTodoRequests>> =
      await fetchTodoRequests();
    if (!requests.length) throw new Error('to_do statu request not found');

    const promises = requests.map((request) => updateRequestStatus(request.id));

    Promise.all(promises)
      .then(() => {})
      .catch((error) => {
        throw new Error(error.message);
      });

    return NextResponse.json(
      {
        message: 'success',
        data: requests.map((request) => request.application_id),
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: 'error ' + e.message },
      { status: 400 },
    );
  }
}

//return array or applications ids

// old code -------------------------------------------------
// const { settings, timezone, recruiterId} = require('./constants');
// const { fetchTodoRequests } = require('./fetchRequests');
// const { updateRequestStatus } = require('./updateRequestStatus');
// const { fetchLatestCandidateAvailability } = require('./fetchAvailability');
// const { fetchAndFilterAvailabilitySlots } = require('./filterSlots');
// const { updateCandidateAvailabilitySlots } = require('./updateAvailabilitySlots');

// function executeConditionalLogic(setting, request) {
//     // Hard
//     if (setting.submitAvailability) {
//         console.log(`Request ${request.id}: Submit availability.`);
//         // Call functions related to submit availability here
//     }

//     if (setting.selfSchedule) {
//         console.log(`Request ${request.id}: Enable self-schedule.`);
//         // Add logic here
//     }

//     if (setting.triggerAvailabilityReminders > 0) {
//         console.log(`Request ${request.id}: Trigger ${setting.triggerAvailabilityReminders} availability reminders.`);
//         // Add logic here
//     }

//     if (setting.triggerSelfSchedulingReminders > 0) {
//         console.log(`Request ${request.id}: Trigger ${setting.triggerSelfSchedulingReminders} self-scheduling reminders.`);
//         // Add logic here
//     }

//     if (setting.requestReschedule) {
//         console.log(`Request ${request.id}: Request reschedule.`);
//         // Add logic here
//     }

//     if (setting.cancelInterview) {
//         console.log(`Request ${request.id}: Cancel interview.`);
//         // Add logic here
//     }

// }

// async function mapRequestsToSettings() {
//     // Get top 15 requests.
//     const requests = await fetchTodoRequests();

//     if (!requests.length) return;

//     const requestSettingsMap = new Map();

//     for (let i = 0; i < requests.length; i++) {
//         const request = requests[i];
//         const setting = settings[i];

//         //  Update request status to in progress
//         await updateRequestStatus(request.id);

//         requestSettingsMap.set(request.id, setting[i]);

//         const availabilityData = await fetchLatestCandidateAvailability(request.application_id);

//         if (availabilityData) {
//             const { number_of_days, number_of_slots } = availabilityData;
//             const filteredSlots = await fetchAndFilterAvailabilitySlots(
//                 recruiterId, timezone, availabilityData.id, number_of_days, number_of_slots
//             );
//             await updateCandidateAvailabilitySlots(request.application_id, filteredSlots);
//         }

//         executeConditionalLogic(setting, request);
//     }

// }

// mapRequestsToSettings();
