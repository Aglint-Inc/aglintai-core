import { Drawer, Stack } from '@mui/material';

import EmailOutReach from '../../Database/EmailOutReach/EmailOutReach';
import EmailOutReachMultiple from '../../Database/EmailOutReach/EmailOutReachMultiple';
import { OutReachCtxProvider } from '../../Database/EmailOutReach/OutReachCtx';
import { setEmailOutReach, useCandidateStore } from '../store';

function EmailOutReachComp() {
  const emailOutReach = useCandidateStore((state) => state.emailOutReach);
  const selectedCandidate = useCandidateStore(
    (state) => state.selectedCandidate,
  );
  const selectedCandidates = useCandidateStore(
    (state) => state.selectedCandidates,
  );

  const selCands = selectedCandidates.map((candidate) => {
    return {
      candidateId: candidate.id,
      email: candidate.email,
      firstName: candidate.first_name,
      lastName: candidate.last_name,
      candOverview: candidate.title,
    };
  });

  return (
    <Drawer
      anchor={'right'}
      open={Boolean(emailOutReach)}
      onClose={() => {
        setEmailOutReach(null);
      }}
    >
      <Stack width={'745px'}>
        {emailOutReach == 'multiple' ? (
          <OutReachCtxProvider
            isMutiple={true}
            // selCandidates={selCands}
            selcandidate={null}
          >
            <EmailOutReachMultiple
              selCandidates={selCands}
              onClose={() => {
                setEmailOutReach(null);
              }}
            />
          </OutReachCtxProvider>
        ) : (
          <OutReachCtxProvider
            isMutiple={false}
            // selCandidates={null}
            selcandidate={
              !emailOutReach
                ? null
                : {
                    candidateId: selectedCandidate.id,
                    candOverview: selectedCandidate.title,
                    email: selectedCandidate.email,
                    firstName: selectedCandidate.first_name,
                    lastName: selectedCandidate.last_name,
                  }
            }
          >
            <EmailOutReach
              isRegenerateVisible={false}
              onClose={() => {
                setEmailOutReach(null);
              }}
            />
          </OutReachCtxProvider>
        )}
      </Stack>
    </Drawer>
  );
}

export default EmailOutReachComp;