import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import {
  MobileLinkCoach,
  MobileLinkDashBoard,
  MobileLinkInterview,
  MobileLinkJobs,
  MobileLinkResume,
  SublinksCoach,
  SublinksInterview,
  SublinksJobs,
  SublinksResume,
} from '@/devlink';
import { pageRoutes } from '@/src/utils/pageRouting';

export function JobSubLinks() {
  const router = useRouter();
  return (
    <SublinksJobs
      isSearchJobs={router.pathname === pageRoutes.JOBS}
      isContacts={router.pathname === pageRoutes.JOBS_CONTACTS}
      isEmailFollowups={router.pathname === pageRoutes.JOBS_EMAIL_FOLLOWUP}
      isJobTracker={router.pathname === pageRoutes.JOB_TRACKER}
      isOrganisation={router.pathname === pageRoutes.JOBS_ORGANIZATION}
      isReminder={router.pathname === pageRoutes.JOBS_REMINDER}
    />
  );
}

export function ResumeSubLinks() {
  const router = useRouter();
  return (
    <SublinksResume
      isMyResume={router.pathname === pageRoutes.RESUME}
      isMyCoverLetter={router.pathname === pageRoutes.COVER_LETTER}
      isFavourites={false}
      isJdmatch={router.pathname === pageRoutes.RESUME_JD_MATCH}
      isResumeAnalysis={router.pathname === pageRoutes.RESUME_ANALYSIS}
    />
  );
}

export function InterviewSubLinks() {
  const router = useRouter();
  return (
    <SublinksInterview
      isTakeInterview={
        router.pathname.includes(pageRoutes.INTERVIEW) &&
        !router.pathname.includes(pageRoutes.INTERVIEW_COMMONLY_ASKED_QUESTIONS)
      }
      isCommonlyAskedQuestions={router.pathname.includes(
        pageRoutes.INTERVIEW_COMMONLY_ASKED_QUESTIONS
      )}
      onClickCommonlyAskedQuestions={{
        onClick: () => {
          router.push(pageRoutes.INTERVIEW_COMMONLY_ASKED_QUESTIONS);
        },
        style: { transition: 'all 1s' },
      }}
      isInterviewHistory={false}
    />
  );
}

export function CoachSubLinks() {
  //   const router = useRouter();
  return (
    <SublinksCoach
      isAskCoach={true}
      isMyCoach={false}
      isPlanDetails={false}
      isSuggestedByCoach={false}
    />
  );
}

// Jobs mobile sub navbar================================
export function MobileDashboardNavBar({ collapse, setCollapse }) {
  const router = useRouter();
  return (
    <Stack position={'relative'}>
      <Stack
        borderRadius={'8px'}
        width={'100%'}
        sx={{
          transition: 'all 0.4s',
        }}
        bgcolor={
          collapse === false &&
          router.pathname === pageRoutes.DASHBOARD &&
          'white.700'
        }
        color={
          collapse === false && router.pathname === pageRoutes.DASHBOARD
            ? 'grey.800'
            : 'grey.600'
        }
      >
        <MobileLinkDashBoard
          isDashboard={
            collapse === false && router.pathname === pageRoutes.DASHBOARD
          }
          onClickDashBoard={{
            onClick: () => {
              router.push(pageRoutes.DASHBOARD);
              setCollapse(false);
            },
          }}
        />
      </Stack>
    </Stack>
  );
}
export function MobileJobNavBar({ collapse, setCollapse }) {
  return (
    <Stack position={'relative'}>
      <Stack
        borderRadius={'8px'}
        width={'100%'}
        sx={{
          transition: 'all 0.4s',
        }}
        height={collapse === 0 ? '256px' : '40px'}
        bgcolor={collapse === 0 && 'white.700'}
        color={collapse === 0 ? 'grey.800' : 'grey.600'}
      >
        <Stack
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MobileLinkJobs
            onClickJobs={{
              onClick: () => {
                if (collapse !== 0) {
                  setCollapse(0);
                } else {
                  setCollapse(false);
                }
              },
            }}
          />
        </Stack>
        <Stack
          sx={{
            transition: `zIndex 1s linear 0.4s, transform 0.4s, opacity 0.6s`,
            opacity: collapse === 0 ? 1 : 0,
            transitionDelay: 'zIndex 0.4s',
            zIndex: collapse === 0 ? 1 : -1,
            transform: collapse !== 0 && 'translate3d(0px, -20px, 0px)',
          }}
          px={'20px'}
        >
          <JobSubLinks />
        </Stack>
      </Stack>
    </Stack>
  );
}

// Resume mobile sub navbar===============================

export function MobileResumeNavBar({ collapse, setCollapse }) {
  return (
    <Stack position={'relative'}>
      <Stack
        borderRadius={'8px'}
        width={'100%'}
        sx={{
          transition: 'all 0.4s',
        }}
        height={collapse === 1 ? '186px' : '40px'}
        bgcolor={collapse === 1 && 'white.700'}
        color={collapse === 1 ? 'grey.800' : 'grey.600'}
      >
        <Stack
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MobileLinkResume
            onClickResume={{
              onClick: () => {
                if (collapse !== 1) {
                  setCollapse(1);
                } else {
                  setCollapse(false);
                }
              },
            }}
          />
        </Stack>
        <Stack
          sx={{
            transition: `zIndex 1s linear 0.4s, transform 0.4s, opacity 0.6s`,
            opacity: collapse === 1 ? 1 : 0,
            transitionDelay: 'zIndex 0.4s',
            zIndex: collapse === 1 ? 1 : -1,
            transform: collapse !== 1 && 'translate3d(0px, -20px, 0px)',
          }}
          px={'20px'}
        >
          <ResumeSubLinks />
        </Stack>
      </Stack>
    </Stack>
  );
}

// Interview prep mobile sub navbar===============================

export function MobileInterviewNavBar({ collapse, setCollapse }) {
  return (
    <Stack position={'relative'}>
      <Stack
        borderRadius={'8px'}
        width={'100%'}
        sx={{
          transition: 'all 0.4s',
        }}
        height={collapse === 2 ? '116px' : '40px'}
        bgcolor={collapse === 2 && 'white.700'}
        color={collapse === 2 ? 'grey.800' : 'grey.600'}
      >
        <Stack
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MobileLinkInterview
            onClickInterview={{
              onClick: () => {
                if (collapse !== 2) {
                  setCollapse(2);
                } else {
                  setCollapse(false);
                }
              },
            }}
          />
        </Stack>
        <Stack
          sx={{
            transition: `zIndex 1s linear 0.4s, transform 0.4s, opacity 0.6s`,
            opacity: collapse === 2 ? 1 : 0,
            transitionDelay: 'zIndex 0.4s',
            zIndex: collapse === 2 ? 1 : -1,
            transform: collapse !== 2 && 'translate3d(0px, -20px, 0px)',
          }}
          px={'20px'}
        >
          <InterviewSubLinks />
        </Stack>
      </Stack>
    </Stack>
  );
}

export function MobileCoachNavBar({ collapse, setCollapse, activePlan }) {
  const router = useRouter();
  return (
    <Stack position={'relative'}>
      <Stack
        borderRadius={'8px'}
        width={'100%'}
        sx={{
          transition: 'all 0.4s',
        }}
        // height={collapse === 3 ? '186px' : '40px'}
        bgcolor={collapse === 3 && 'white.700'}
        color={collapse === 3 ? 'grey.800' : 'grey.600'}
      >
        <MobileLinkCoach
          isCoach={router.pathname === pageRoutes.Career_COACH}
          isPro={activePlan}
          onClickCoach={{
            onClick: () => {
              router.push(pageRoutes.Career_COACH); // remove when sub links comes
              if (collapse !== 3) {
                setCollapse(3);
              } else {
                setCollapse(false);
              }
            },
          }}
        />
        {/* // sub links code */}
        {/* <Stack
          sx={{
            transition: `zIndex 1s linear 0.4s, transform 0.4s, opacity 0.6s`,
            opacity: collapse === 3 ? 1 : 0,
            transitionDelay: 'zIndex 0.4s',
            zIndex: collapse === 3 ? 1 : -1,
            transform: collapse !== 3 && 'translate3d(0px, -20px, 0px)',
          }}
          px={'20px'}
        >
          <CoachSubLinks />
        </Stack> */}
      </Stack>
    </Stack>
  );
}

// transition: `transform 0.4s, opacity  ${
//   collapse ? '0.6s' : '0.2s'
// }`,
// opacity: collapse ? 1 : 0,
// transform: !collapse && 'translate3d(0px, -20px, 0px)',
