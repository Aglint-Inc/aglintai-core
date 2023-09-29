import { Collapse, Stack } from '@mui/material';
import React, { useState } from 'react';

import {
  DetailedFeedback,
  DetailedFeedbackCard,
  InterviewResult,
  InterviewTranscriptCard,
  JobDetailsSideDrawer,
} from '@/devlink';
import CustomProgress from '@/src/components/Common/CustomProgress';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import SidePanelDrawer from '@/src/components/Common/SidePanelDrawer';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

import InterviewScoreCard from '../../Common/InreviewScoreCard';

function ApplicationDetails({
  openSidePanel,
  setOpenSidePanel,
  applicationDetails,
}) {
  const [openDetailedFeedback, setOpenDetailedFeedback] = useState(false);
  const overAllScore =
    applicationDetails.feedback &&
    Math.floor(
      applicationDetails.feedback.reduce(
        (sum, entry) =>
          sum +
          Number(
            String(entry.rating).includes('/')
              ? entry.rating.split('/')[0]
              : entry.rating,
          ),
        0,
      ) / applicationDetails.feedback.length,
    );
  return (
    <SidePanelDrawer
      openSidePanelDrawer={openSidePanel}
      setOpenPanelDrawer={setOpenSidePanel}
      onClose={() => {
        setOpenDetailedFeedback(false);
      }}
    >
      <Stack direction={'row'}>
        <Stack width={'35vw'}>
          <JobDetailsSideDrawer
            onClickCopyProfile={{
              onClick: () => {
                navigator.clipboard
                  .writeText(
                    `https://recruiter.aglinthq.com/${pageRoutes.InterviewFeedbackLink}/${applicationDetails.application_id}`,
                  )
                  .then(() => {
                    toast.success('Link Copied');
                  });
              },
            }}
            onClickClose={{
              onClick: () => {
                setOpenSidePanel(false);
              },
            }}
            slotProfileImage={
              <MuiAvatar
                level={applicationDetails.first_name}
                src={'/'}
                variant={'rounded'}
                width={'78px'}
                height={'78px'}
                fontSize={'28px'}
              />
            }
            isCloseButtonVisible={!openDetailedFeedback}
            slotInterviewResult={
              <InterviewResult
                textScore={
                  overAllScore > 90
                    ? `Absolutely incredible! 🌟😍`
                    : overAllScore > 70
                    ? `Truly outstanding! 🤩`
                    : overAllScore > 50
                    ? `Excellent job! 👏`
                    : `Not up to mark! 😑`
                }
                slotScore={<InterviewScoreCard overAllScore={overAllScore} />}
                slotInterviewFeedback={
                  <>
                    {applicationDetails?.feedback &&
                      applicationDetails?.feedback.map((feedback, i) => {
                        let rating = Number(
                          String(feedback.rating).includes('/')
                            ? feedback.rating.split('/')[0]
                            : feedback.rating,
                        );
                        return (
                          <DetailedFeedbackCard
                            textScorePercentage={rating + '%'}
                            textHeader={feedback.topic}
                            textDescription={''}
                            key={i}
                            textColorScore={{
                              style: {
                                color:
                                  rating >= 90
                                    ? '#228F67'
                                    : rating >= 70
                                    ? '#f79a3e'
                                    : rating >= 50
                                    ? '#de701d'
                                    : '#d93f4c',
                              },
                            }}
                            slotScore={
                              <CustomProgress
                                rotation={270}
                                fillColor={
                                  rating >= 90
                                    ? '#228F67'
                                    : rating >= 70
                                    ? '#f79a3e'
                                    : rating >= 50
                                    ? '#de701d'
                                    : '#d93f4c'
                                }
                                bgFill={
                                  rating >= 90
                                    ? '#edf8f4'
                                    : rating >= 70
                                    ? '#fff7ed'
                                    : rating >= 50
                                    ? '#ffeedb'
                                    : '#fff0f1'
                                }
                                size={5}
                                progress={rating}
                              />
                            }
                          />
                        );
                      })}
                  </>
                }
                onClickShowTranscript={{
                  onClick: () => {
                    setOpenDetailedFeedback(true);
                  },
                }}
              />
            }
            textName={
              applicationDetails?.first_name +
              ' ' +
              applicationDetails?.last_name
            }
            // textInterviewHeader={
            //   overAllScore > 90
            //     ? `Absolutely incredible! 🌟😍`
            //     : overAllScore > 70
            //     ? `Truly outstanding! 🤩`
            //     : overAllScore > 50
            //     ? `Excellent job! 👏`
            //     : `Not up to mark! 😑`
            // }

            // onClickCopyFeedbackLink={{
            //   onClick: () => {
            //     navigator.clipboard
            //       .writeText(
            //         `https://recruiter.aglinthq.com/${pageRoutes.InterviewFeedbackLink}/${applicationDetails.application_id}`,
            //       )
            //       .then(() => {
            //         toast.success('Link Copied');
            //       });
            //   },
            // }}
            // slotScore={
            //   <Stack height={'100%'} overflow={'hidden'}>
            //     <CustomProgress
            //       progress={overAllScore}
            //       rotation={270}
            //       fillColor={
            //         overAllScore >= 90
            //           ? '#228F67'
            //           : overAllScore >= 70
            //           ? '#f79a3e'
            //           : overAllScore >= 50
            //           ? '#de701d'
            //           : '#d93f4c'
            //       }
            //       bgFill={
            //         overAllScore >= 90
            //           ? '#edf8f4'
            //           : overAllScore >= 70
            //           ? '#fff7ed'
            //           : overAllScore >= 50
            //           ? '#ffeedb'
            //           : '#fff0f1'
            //       }
            //       size={25}
            //       strokeWidth={2}
            //       label={
            //         <Stack justifyContent={'center'} alignItems={'center'}>
            //           {overAllScore}%
            //         </Stack>
            //       }
            //       fontSize={15}
            //     />
            //   </Stack>
            // }

            //  ={{
            //     onClick: () => {
            //       setOpenDetailedFeedback((pre) => !pre);
            //     },
            //   }}

            isInterviewVisible={
              applicationDetails.feedback &&
              Math.floor(
                applicationDetails.feedback.reduce(
                  (sum, entry) =>
                    sum +
                    Number(
                      String(entry.rating).includes('/')
                        ? entry.rating.split('/')[0]
                        : entry.rating,
                    ),
                  0,
                ) / applicationDetails.feedback.length,
              ) !== 0
            }
            isKeySkillsVisible={false}
            slotResumeScore={
              <CustomProgress
                progress={overAllScore}
                rotation={270}
                fillColor={
                  overAllScore >= 90
                    ? '#228F67'
                    : overAllScore >= 70
                    ? '#f79a3e'
                    : overAllScore >= 50
                    ? '#de701d'
                    : '#d93f4c'
                }
                bgFill={
                  overAllScore >= 90
                    ? '#edf8f4'
                    : overAllScore >= 70
                    ? '#fff7ed'
                    : overAllScore >= 50
                    ? '#ffeedb'
                    : '#fff0f1'
                }
                size={35}
                // strokeWidth={5}
                // text={'Resume Score'}
                // label={overAllScore}
                // fontSize={'25px'}
              />
            }
            // isResumeVisible={applicationDetails.score}
            isResumeVisible={false}
            textPhone={
              applicationDetails.phone ? applicationDetails.phone : '--'
            }
            textMail={
              applicationDetails.email ? applicationDetails.email : '--'
            }
            textSites={applicationDetails.company}
          />
        </Stack>
        <Collapse orientation='horizontal' in={openDetailedFeedback}>
          <Stack width={'30vw'}>
            <DetailedFeedback
              slotTranscript={
                <>
                  {applicationDetails.conversation?.map((ele, i) => {
                    return (
                      <InterviewTranscriptCard
                        slotUserImage={
                          <MuiAvatar
                            src={'/'}
                            level={applicationDetails?.first_name}
                            height={'24px'}
                            width={'24px'}
                            fontSize={'15px'}
                            variant={'circular'}
                          />
                        }
                        slotAiImage={
                          <svg
                            width='24'
                            height='24'
                            viewBox='0 0 36 36'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M27.4875 16.8075C24.255 15.9975 22.635 15.6 21.5175 14.4825C20.4 13.3575 20.0025 11.745 19.1925 8.5125L18 3.75L16.8075 8.5125C15.9975 11.745 15.6 13.365 14.4825 14.4825C13.3575 15.6 11.745 15.9975 8.5125 16.8075L3.75 18L8.5125 19.1925C11.745 20.0025 13.365 20.4 14.4825 21.5175C15.6 22.6425 15.9975 24.255 16.8075 27.4875L18 32.25L19.1925 27.4875C20.0025 24.255 20.4 22.635 21.5175 21.5175C22.6425 20.4 24.255 20.0025 27.4875 19.1925L32.25 18L27.4875 16.8075Z'
                              fill='#FF6224'
                            ></path>
                          </svg>
                        }
                        textQuestion={ele?.content}
                        textAnswer={ele.userContent}
                        textAiName={'Aglint Ai'}
                        userTextName={applicationDetails?.first_name}
                        key={i}
                      />
                    );
                  })}
                </>
              }
              slotDetailedFeedback={
                <>
                  {applicationDetails?.feedback?.map((ele, i) => {
                    let rating = Number(
                      String(ele.rating).includes('/')
                        ? ele.rating.split('/')[0]
                        : ele.rating,
                    );
                    return (
                      <DetailedFeedbackCard
                        textColorScore={{
                          style: {
                            color:
                              rating >= 90
                                ? '#228F67'
                                : rating >= 70
                                ? '#f79a3e'
                                : rating >= 50
                                ? '#de701d'
                                : '#d93f4c',
                          },
                        }}
                        textHeader={ele?.topic}
                        textDescription={ele.feedback}
                        textScorePercentage={rating + '%'}
                        slotScore={
                          <CustomProgress
                            rotation={270}
                            fillColor={
                              rating >= 90
                                ? '#228F67'
                                : rating >= 70
                                ? '#f79a3e'
                                : rating >= 50
                                ? '#de701d'
                                : '#d93f4c'
                            }
                            bgFill={
                              rating >= 90
                                ? '#edf8f4'
                                : rating >= 70
                                ? '#fff7ed'
                                : rating >= 50
                                ? '#ffeedb'
                                : '#fff0f1'
                            }
                            size={5}
                            progress={rating}
                          />
                        }
                        key={i}
                      />
                    );
                  })}
                </>
              }
              onClickBack={{
                onClick: () => {
                  setOpenDetailedFeedback(false);
                },
              }}
            />
          </Stack>
        </Collapse>
      </Stack>
    </SidePanelDrawer>
  );
}

export default ApplicationDetails;
