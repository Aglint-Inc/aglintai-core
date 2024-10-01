/* eslint-disable security/detect-object-injection */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'; // Import shadcn accordion components
import { Skeleton } from '@components/ui/skeleton';
import { Lightbulb, Medal } from 'lucide-react';
import { useState } from 'react';

import { UIBadge } from '@/components/Common/UIBadge';

import { useApplicationDetails } from '../../hooks/useApplicationDetails';
import { Loader } from './Analysis/Common/Loader';

const Skills = () => {
  const { data } = useApplicationDetails();

  const highRelevanceSkills = getHighRelevanceSkills(data);

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='skills'>
        <AccordionTrigger>
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <Lightbulb size={16} />
              <span className='font-medium'>Skills</span>
            </div>
            {highRelevanceSkills.length > 0 && (
              <div className='flex space-x-1'>
                {highRelevanceSkills.map((skill, index) => (
                  <UIBadge
                    key={index}
                    className='rounded-full bg-purple-200 px-2 py-1 text-xs font-medium text-purple-600'
                    textBadge={skill}
                  />
                ))}
              </div>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className='flex w-full flex-row flex-wrap gap-1'>
            <Content />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export { Skills };

const getHighRelevanceSkills = (
  data: ReturnType<typeof useApplicationDetails>['data'],
) => {
  if (!data?.resume_json?.skills || !data?.score_json?.relevance?.skills)
    return [];
  const relevance = data.score_json.relevance.skills;
  const highSkills = data.resume_json.skills.filter(
    (skill) => relevance[skill] === 'high',
  );
  return highSkills.slice(0, 3); // Get top 3 high relevance skills
};

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
      <div className='mx-auto flex flex-col items-center justify-center p-4'>
        <Medal className='mb-2 h-12 w-12 text-muted-foreground' />
        <p className='text-sm text-gray-600'>No skills found</p>
      </div>
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
    : skillsWithRelevance.slice(0, 10);

  return (
    <>
      {itemsToShow.map(({ skill, relevance }, i) => (
        <UIBadge
          key={i}
          textBadge={
            conjunctions.includes(skill.toLowerCase())
              ? skill.toLowerCase()
              : skill.charAt(0).toUpperCase() + skill.slice(1)
          }
          color={relevance === 'high' ? 'purple' : 'neutral'}
        />
      ))}
      {skillsWithRelevance.length > 10 && (
        <div className='mt-2 w-full'>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='text-blue-500 hover:underline'
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </>
  );
};
