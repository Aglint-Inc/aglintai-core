/* eslint-disable security/detect-object-injection */

import { Button } from '@components/ui/button';
import { Skeleton } from '@components/ui/skeleton';
import { Medal, Star } from 'lucide-react';
import { useState } from 'react';

import { EmptyState } from '@/common/EmptyState';

import { useApplicationDetails } from '../../hooks/useApplicationDetails';
import ApplicationDetailAccordion from '../ui/ApplicationDetailAccordian';
import { Loader } from './Analysis/Common/Loader';

const Skills = () => {
  return (
    <>
      <ApplicationDetailAccordion title='Skills' Icon={Star} headerSlot={<></>}>
        <div className='flex w-full flex-row flex-wrap gap-2'>
          <Content />
        </div>
      </ApplicationDetailAccordion>
    </>
  );
};

export { Skills };

const Content = () => {
  const { data, status } = useApplicationDetails();
  if (status === 'pending')
    return (
      <Loader count={10}>
        <div className='relative h-[22px] w-[60px]'>
          <Skeleton className='h-10 w-full' />
        </div>
      </Loader>
    );
  if (
    !(
      (data?.resume_json?.skills ?? []).length &&
      data?.score_json?.relevance?.skills
    )
  )
    return (
      <EmptyState
        header='No skills found'
        description='No skills were identified for this candidate based on the resume.'
        icon={Medal}
      />
    );
  return <Skill />;
};

const Skill = () => {
  const {
    data: {
      resume_json: { skills },
      score_json: {
        relevance: { skills: relevance },
      },
    },
  } = useApplicationDetails();

  // State to control the collapsible
  const [isExpanded, setIsExpanded] = useState(false);

  // Map skills with their relevance
  const skillsWithRelevance = skills.map((skill) => ({
    skill,
    relevance: relevance[skill] || 'low', // Default to 'low' if relevance is undefined
  }));

  // Sort skills with 'high' relevance first
  skillsWithRelevance.sort((a, b) => {
    if (a.relevance === b.relevance) return 0;
    return a.relevance === 'high' ? -1 : 1;
  });

  // List of conjunctions to exclude from capitalization
  const conjunctions = ['and', 'or', 'but', 'nor', 'so', 'for', 'yet'];

  // Determine the skills to display
  const itemsToShow = isExpanded
    ? skillsWithRelevance
    : skillsWithRelevance.slice(0, 20);

  return (
    <>
      {itemsToShow.map(({ skill, relevance }, i) => (
        <>
          <div
            key={i}
            className={`rounded-sm px-3 py-1 text-sm ${
              relevance === 'high'
                ? 'bg-purple-100 text-purple-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {conjunctions.includes(skill.toLowerCase())
              ? skill.toLowerCase()
              : skill.charAt(0).toUpperCase() + skill.slice(1)}
          </div>
        </>
      ))}
      {skillsWithRelevance.length > 20 && (
        <div className='mt-2 w-full'>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className='text-blue-500'
            size={'sm'}
            variant={'ghost'}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        </div>
      )}
    </>
  );
};
