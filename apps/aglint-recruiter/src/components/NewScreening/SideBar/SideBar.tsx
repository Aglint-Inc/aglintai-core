import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { CandidateSideDrawer } from '@/devlink/CandidateSideDrawer';
import { InvitedCards } from '@/devlink2/InvitedCards';
import { InviteStatus } from '@/devlink2/InviteStatus';
import { ResponseCard } from '@/devlink2/ResponseCard';
import { SubmittedCard } from '@/devlink2/SubmittedCard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

const SideBar = ({ appId, openDrawer }) => {
  const { recruiter_id } = useAuthDetails();
  const [details, setDetails] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [id, setId] = useState('');
  const handleClickNext = () => {
    const currentIndex = details.findIndex((candidate) => candidate.id === id);
    if (currentIndex !== -1 && currentIndex < details.length - 1) {
      setId(details[currentIndex + 1].id);
    }
  };
  const handleClickPrev = () => {
    const currentIndex = details.findIndex((candidate) => candidate.id === id);
    if (currentIndex !== -1 && currentIndex > 0) {
      setId(details[currentIndex - 1].id);
    }
  };
  const fetchApplicantsId = async () => {
    const { data, error } = await supabase.rpc('get_screening_candidates', {
      p_recruiter_id: recruiter_id,
    });

    if (error) {
      toast.error('Failed to Fetch Details');
    } else {
      setDetails(data);
    }

    return data;
  };

  const sendInvite = async (
    public_job_id: string,
    company: string,
    job_title: string,
    firstname: string,
    last_name: string,
    application_id: string,
    status_email_sent: Record<string, any>,
    candidate_id: string,
    email_template: Record<string, any>,
    email: string,
    assessment_result: Record<string, any>,
    result_created_at: string,
    purposes: string,
  ) => {
    if (application_id) {
      const { data } = await axios.post('/api/phone-screening/invite', {
        job: {
          id: public_job_id,
          company: company,
          job_title: job_title,
          email_template: email_template,
        },
        purposes: [purposes],
        candidates: [
          {
            first_name: firstname,
            last_name: last_name,
            application_id: application_id,
            status_email_sent: status_email_sent,
            candidate_id: candidate_id,
            email: email,
            assessment_results: [
              { result: assessment_result, created_at: result_created_at },
            ],
          },
        ],
        applicationIds: [application_id],
      });
      if (data) {
        // do something
      }
    }
  };

  useEffect(() => {
    fetchApplicantsId();
    setId(appId);
    setDrawerOpen(openDrawer);
  }, [appId]);
  return (
    <Stack
      style={{
        display: drawerOpen ? 'flex' : 'none',
        transition: 'width 0.4s',
        width: drawerOpen ? '420px' : '0px',
        height: '100%',
        pointerEvents: drawerOpen ? 'auto' : 'none',
        overflow: drawerOpen ? 'visible' : 'auto',
      }}
    >
      <CandidateSideDrawer
      // !TODO: Fix component here
      // textName={details
      //   .filter((data) => data.id === id)
      //   .map((data) => {
      //     return (
      //       data.first_name +
      //       ' ' +
      //       (data.last_name === null ? '' : data.last_name)
      //     );
      //   })}
      // isSmallWidthVisible={false}
      // isAppliedOnVisible={false}
      // isLocationRoleVisible={false}
      // isLocationVisible={false}
      // isNavigationButtonVisible={true}
      // isOverviewVisible={false}
      // isResumeVisible={false}
      // isRoleVisible={false}
      // onClickPrev={{
      //   onClick: () => {
      //     handleClickPrev();
      //   },
      // }}
      // onClickNext={{
      //   onClick: () => {
      //     handleClickNext();
      //   },
      // }} // come here
      // onClickClose={{
      //   onClick: () => {
      //     setDrawerOpen(false), setId('');
      //   },
      // }}
      // slotCandidateDetails={details
      //   .filter((data) => data.id === id)
      //   .map((data) => {
      //     const isSubmitted = data.created_at === null ? false : true;
      //     const isInvited =
      //       data.status_emails_sent.phone_screening === undefined
      //         ? false
      //         : true;
      //     const isNotInvited =
      //       data.status_emails_sent.phone_screening === undefined
      //         ? true
      //         : false;
      //     const textStatus = isSubmitted
      //       ? 'Submitted'
      //       : isNotInvited
      //         ? 'Not Invited'
      //         : 'Invited';
      //     return (
      //       <SubmittedCard
      //         key={data.id}
      //         slotInvitedCard={
      //           <InvitedCards
      //             onClickInviteLink={{
      //               onClick: () => {
      //                 navigator.clipboard.writeText(
      //                   `${process.env.NEXT_PUBLIC_HOST_NAME}/candidate-phone-screening?job_post_id=${data.public_job_id}&application_id=${data.id}
      //                 `,
      //                 );
      //                 toast.success('Copied to clipboard.');
      //               },
      //             }}
      //             onClickInviteNow={{
      //               onClick: () => {
      //                 sendInvite(
      //                   data.public_job_id,
      //                   data.company,
      //                   data.job_title,
      //                   data.first_name,
      //                   data.last_name,
      //                   data.id,
      //                   data.status_emails_sent,
      //                   data.candidate_id,
      //                   data.email_template,
      //                   data.email,
      //                   data.assessment_result,
      //                   data.result_created_at,
      //                   'phone_screening',
      //                 );
      //                 toast.success('Invite sent successfully.');
      //               },
      //             }}
      //             onClickResendInvite={{
      //               onClick: () => {
      //                 sendInvite(
      //                   data.public_job_id,
      //                   data.company,
      //                   data.job_title,
      //                   data.first_name,
      //                   data.last_name,
      //                   data.id,
      //                   data.status_emails_sent,
      //                   data.candidate_id,
      //                   data.email_template,
      //                   data.email,
      //                   data.assessment_result,
      //                   data.result_created_at,
      //                   'phone_screening_resend',
      //                 );
      //                 toast.success('Invite sent.');
      //               },
      //             }}
      //             slotInviteStatus={
      //               <InviteStatus
      //                 textStatus={textStatus}
      //                 isNotInvited={isSubmitted ? false : isNotInvited}
      //                 isInvited={isSubmitted ? false : isInvited}
      //                 isSubmitted={isSubmitted ? true : false}
      //                 isStatusTimeVisible={
      //                   isSubmitted || isInvited ? true : false
      //                 }
      //                 textStatusTime={
      //                   isSubmitted
      //                     ? dayjs(data.created_at).fromNow()
      //                     : dayjs(
      //                         data.status_emails_sent
      //                           .phone_screening_resend ||
      //                           data.status_emails_sent.phone_screening,
      //                       ).fromNow()
      //                 }
      //               />
      //             }
      //             textDesc={
      //               data.response
      //                 ? ''
      //                 : data.status_emails_sent.phone_screening
      //                   ? 'The candidate has received an screening invitation but has not yet taken the screening.'
      //                   : 'The candidate has not been invited for screening yet. '
      //             }
      //             textQuestionCount={
      //               data.questions
      //                 ? data.questions.questions.length + ' ' + 'Questions'
      //                 : 0 + ' ' + 'Questions'
      //             }
      //             textTitle={data.screening_title}
      //             isInviteNowVisible={
      //               data.status_emails_sent.phone_screening === undefined &&
      //               data.created_at !== null
      //                 ? false
      //                 : data.status_emails_sent.phone_screening === undefined
      //                   ? true
      //                   : false
      //             }
      //             isResendInviteVisible={
      //               data.status_emails_sent.phone_screening !== undefined &&
      //               data.created_at !== null
      //                 ? false
      //                 : data.status_emails_sent.phone_screening !== undefined
      //                   ? true
      //                   : false
      //             }
      //             isInviteLink={data.created_at === null}
      //           />
      //         }
      //         isResponseVisible={data.response !== null}
      //         slotResponseCard={
      //           data.response === null
      //             ? ''
      //             : data.response.response.map((answer) => {
      //                 return (
      //                   <ResponseCard
      //                     key={answer.id}
      //                     textQuestion={
      //                       answer.question !== null ? answer.question : ''
      //                     }
      //                     textAnswer={
      //                       answer.candAnswer === ''
      //                         ? answer.options.map((option) => {
      //                             return option.isChecked === true
      //                               ? option.option
      //                               : '';
      //                           })
      //                         : answer.candAnswer
      //                     }
      //                   />
      //                 );
      //               })
      //         }
      //       />
      //     );
      //   })}
      // slotOverview={<></>}
      // slotSocialLink={<></>}
      />
    </Stack>
  );
};

export default SideBar;
