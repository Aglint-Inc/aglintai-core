/* eslint-disable security/detect-object-injection */
import {
  DatabaseEnums,
  DatabaseTable,
  EmailTemplateAPi,
} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { Button, Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import ScheduleFlows from '../Actions/Schedule';
import { EventTargetMapType, RequestProgressMapType } from '../types';
import { getSchedulFlow } from '../utils/getScheduleFlow';
import { apiTargetToEvents } from '../utils/progressMaps';
import EventNode from './EventNode';

const SelectScheduleFlow = ({
  eventTargetMap,
}: {
  eventTargetMap: EventTargetMapType;
}) => {
  const { request_progress } = useRequest();
  const eventWActions = eventTargetMap['onRequestSchedule'] ?? [];
  const isManualSchedule = eventWActions.length === 0;

  const scheduleReqProgressMap: RequestProgressMapType = useMemo(() => {
    let mp: RequestProgressMapType = {};

    request_progress.data.forEach((row) => {
      if (!mp[row.event_type]) {
        mp[row.event_type] = [];
      }
      mp[row.event_type].push({ ...row });
    });
    return mp;
  }, [request_progress]);

  let scheduleFlow = getSchedulFlow({
    eventTargetMap,
    requestTargetMp: scheduleReqProgressMap,
  });

  return (
    <Stack>
      <TextWithIcon
        textContent={<>EVENT : Candidate Schedule</>}
        iconSize={3}
        fontSize={1}
        // color={getProgressColor(tense)}
      />
      <Stack ml={4} mt={1} rowGap={1.5}>
        <ShowCode.When
          isTrue={isManualSchedule && request_progress.data.length === 0}
        >
          <ScheduleFlows />
        </ShowCode.When>

        <ShowCode.When isTrue={scheduleFlow === 'selfSchedule'}>
          <SelfScheduleFlowMenus
            isManualSchedule={isManualSchedule}
            eventTargetMap={eventTargetMap}
            scheduleReqProgressMap={scheduleReqProgressMap}
          />
        </ShowCode.When>
        <ShowCode.When isTrue={scheduleFlow === 'availability'}>
          <AvailabilityFlowMenus
            isManualSchedule={isManualSchedule}
            eventTargetMap={eventTargetMap}
            scheduleReqProgressMap={scheduleReqProgressMap}
          />
        </ShowCode.When>
      </Stack>
    </Stack>
  );
};

export default SelectScheduleFlow;

const AvailabilityFlowMenus = ({
  isManualSchedule,
  scheduleReqProgressMap,
  eventTargetMap,
}: {
  eventTargetMap: EventTargetMapType;
  isManualSchedule: boolean;
  scheduleReqProgressMap: RequestProgressMapType;
}) => {
  const { query } = useRouter();
  const requestId = query.id as string;
  const { request_progress } = useRequest();
  let lastEvent: DatabaseTable['request_progress'];
  let eventWActions: DatabaseEnums['email_slack_types'][] = [];
  if (eventTargetMap['onRequestSchedule']) {
    eventWActions = [
      ...eventTargetMap['onRequestSchedule'],
      ...eventTargetMap['sendAvailReqReminder'],
    ];
  }
  let scheduleFlowProg = useMemo(() => {
    let progres: DatabaseTable['request_progress'][] = [];
    if (request_progress.data.length === 0) {
      return progres;
    }
    request_progress.data.forEach((prog) => {
      if (prog.event_type !== 'CAND_AVAIL_REC') {
        progres.push({
          ...prog,
        });
      }
    });
    return progres;
  }, [request_progress.data]);

  if (scheduleFlowProg.length > 0) {
    lastEvent = scheduleFlowProg[scheduleFlowProg.length - 1];
  }

  let isAvailabilityRecieved = false;
  if (request_progress.data.find((p) => p.event_type === 'CAND_AVAIL_REC')) {
    isAvailabilityRecieved = true;
  }

  const handleFollowup = async () => {
    try {
      const [cand_req] = supabaseWrap(
        await supabase
          .from('candidate_request_availability')
          .select()
          .eq('request_id', requestId),
      );
      const payload: EmailTemplateAPi<'sendAvailReqReminder_email_applicant'>['api_payload'] =
        {
          avail_req_id: cand_req.id,
        };
      await axios.post('/api/emails/sendAvailReqReminder_email_applicant', {
        ...payload,
      });
    } catch (err) {
      toast.error('Some wrong happenned please try again');
    }
  };
  return (
    <>
      <ShowCode.When isTrue={isManualSchedule}>
        {scheduleFlowProg.map((prog) => {
          return (
            <EventNode
              key={prog.id}
              eventNode={prog.event_type}
              reqProgressMap={scheduleReqProgressMap}
            />
          );
        })}
      </ShowCode.When>
      <ShowCode.When isTrue={!isManualSchedule}>
        {eventWActions
          .map((eA) => {
            return apiTargetToEvents[eA];
          })
          .flat()
          .map((ev) => {
            return (
              <EventNode
                key={ev}
                eventNode={ev}
                reqProgressMap={scheduleReqProgressMap}
              />
            );
          })}
        <ShowCode.When
          isTrue={Boolean(
            scheduleReqProgressMap['SCHEDULE_FIRST_FOLLOWUP_AVAILABILITY_LINK'],
          )}
        >
          <EventNode
            eventNode='SCHEDULE_FIRST_FOLLOWUP_AVAILABILITY_LINK'
            reqProgressMap={scheduleReqProgressMap}
          />
        </ShowCode.When>
        <ShowCode.When
          isTrue={Boolean(
            scheduleReqProgressMap['SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE'],
          )}
        >
          <EventNode
            eventNode='SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE'
            reqProgressMap={scheduleReqProgressMap}
          />
        </ShowCode.When>
      </ShowCode.When>
      <ShowCode.When
        isTrue={
          Boolean(
            !isAvailabilityRecieved &&
              lastEvent &&
              lastEvent.event_type === 'REQ_CAND_AVAIL_EMAIL_LINK' &&
              !scheduleReqProgressMap[
                'SCHEDULE_FIRST_FOLLOWUP_AVAILABILITY_LINK'
              ],
          ) && !eventTargetMap['sendAvailReqReminder']
        }
      >
        <span>
          <Button onClick={handleFollowup}>Resend Link</Button>
        </span>
      </ShowCode.When>
      <ShowCode.When
        isTrue={
          !isAvailabilityRecieved &&
          Boolean(scheduleReqProgressMap['REQ_CAND_AVAIL_EMAIL_LINK'])
        }
      >
        <span>
          <Button>Re Request Availability</Button>
        </span>
      </ShowCode.When>
    </>
  );
};

const SelfScheduleFlowMenus = ({
  isManualSchedule,
  scheduleReqProgressMap,
  eventTargetMap,
}: {
  eventTargetMap: EventTargetMapType;
  isManualSchedule: boolean;
  scheduleReqProgressMap: RequestProgressMapType;
}) => {
  const { request_progress } = useRequest();

  let scheduleFlowProg = useMemo(() => {
    let progres: DatabaseTable['request_progress'][] = [];
    if (request_progress.data.length === 0) {
      return progres;
    }
    request_progress.data.forEach((prog) => {
      if (prog.event_type !== 'CAND_CONFIRM_SLOT') {
        progres.push({
          ...prog,
        });
      }
    });
    return progres;
  }, [request_progress.data]);
  //
  let eventWActions: DatabaseEnums['email_slack_types'][] = [];
  if (eventTargetMap['onRequestSchedule']) {
    eventWActions = [
      ...eventTargetMap['onRequestSchedule'],
      ...eventTargetMap['selfScheduleReminder'],
    ];
  }

  return (
    <>
      <ShowCode.When isTrue={isManualSchedule}>
        {scheduleFlowProg.map((prog) => {
          return (
            <>
              <EventNode
                key={prog.id}
                eventNode={prog.event_type}
                reqProgressMap={scheduleReqProgressMap}
              />
            </>
          );
        })}
      </ShowCode.When>
      <ShowCode.When isTrue={!isManualSchedule}>
        {eventWActions
          .map((eA) => {
            return apiTargetToEvents[eA];
          })
          .flat()
          .map((ev) => {
            return (
              <EventNode
                key={ev}
                eventNode={ev}
                reqProgressMap={scheduleReqProgressMap}
              />
            );
          })}
        {scheduleReqProgressMap['SELF_SCHEDULE_FIRST_FOLLOWUP'] && (
          <EventNode
            eventNode='SELF_SCHEDULE_FIRST_FOLLOWUP'
            reqProgressMap={scheduleReqProgressMap}
          />
        )}
      </ShowCode.When>
    </>
  );
};
