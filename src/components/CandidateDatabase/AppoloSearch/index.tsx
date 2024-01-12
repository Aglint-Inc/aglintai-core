import { Avatar, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

import { AllCandidateListItem } from '@/devlink2';
import { useBoundStore } from '@/src/store';

import { FetchCandidatesParams } from './types';

function AppoloSearch() {
  const setCandidates = useBoundStore((state) => state.setCandidates);
  const candidates = useBoundStore((state) => state.candidates);
  const searchQuery = useBoundStore((state) => state.searchQuery);

  useEffect(() => {
    (async () => {
      await fetchCandidates(searchQuery);
    })();
  }, []);

  const fetchCandidates = async (
    params: FetchCandidatesParams,
  ): Promise<boolean> => {
    const response = await axios.post('/api/candidatedb/search', {
      page: 1,
      per_page: 10,
      ...params,
    });
    setCandidates(response.data.people);
    return true;
  };

  return (
    <Stack>
      {candidates.map((candidate) => (
        <AllCandidateListItem
          key={candidate.id}
          slotProfileImage={
            <Avatar
              src={candidate.photo_url}
              sx={{
                height: '18px',
                width: '18px',
                '& .MuiAvatar-img ': {
                  objectFit: 'cover',
                },
              }}
            />
          }
          name={candidate.name}
          jobTitle={candidate.title}
          location={candidate.city}
          slotResumeScore={''}
          email={candidate.email || '---'}
          phone={candidate.phone_numbers[0].raw_number || '---'}
          isInterviewVisible={false}
          isHighlighted={false}
          experience={0}
          company={candidate.organization.name || '---'}
        />
      ))}

      
    </Stack>
  );
}

export default AppoloSearch;
