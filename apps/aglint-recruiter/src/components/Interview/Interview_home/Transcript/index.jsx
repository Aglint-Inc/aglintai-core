import { InterviewAiTranscriptCard } from '@/devlink/InterviewAiTranscriptCard';
import { InterviewCandidateCard } from '@/devlink/InterviewCandidateCard';
import { NewInterviewTranscript } from '@/devlink/NewInterviewTranscript';
import MuiAvatar from '@/src/components/Common/MuiAvatar';

function Transcript({ setOpenPanelDrawer, conversations, interviewerImage }) {
  return (
    <div>
      <NewInterviewTranscript
        onClickClose={{
          onClick: () => {
            setOpenPanelDrawer(false);
          },
        }}
        slotInterviewTranscript={conversations.map((ele) => {
          return (
            <>
              <InterviewAiTranscriptCard
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
                textAiName={'Interviewer'}
                textAiScript={ele?.content}
              />
              <InterviewCandidateCard
                slotCandidateImage={
                  <MuiAvatar
                    src={interviewerImage}
                    variant='rounded-small'
                  />
                }
                textCandidateScript={
                  ele?.userContent
                    ? ele?.userContent
                    : 'Waiting for your answer...'
                }
              />
            </>
          );
        })}
      />
    </div>
  );
}

export default Transcript;
