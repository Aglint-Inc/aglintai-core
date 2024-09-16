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
import { useApplication } from '@/context/ApplicationContext';

import { Loader } from '../Common/Loader';

const Skills = () => {
  const {
    details: { data },
  } = useApplication();

  const highRelevanceSkills = getHighRelevanceSkills(data);

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='skills'>
        <AccordionTrigger>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center space-x-2'>
              <Lightbulb size={16} />
              <span className='font-medium'>Skills</span>
            </div>
            {highRelevanceSkills.length > 0 && (
              <div className='flex space-x-1'>
                {highRelevanceSkills.map((skill, index) => (
                  <UIBadge
                    key={index}
                    className='text-xs font-medium px-2 py-1 rounded-full bg-purple-200 text-purple-600'
                    textBadge={skill}
                  />
                ))}
              </div>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className='flex flex-row flex-wrap w-full gap-1'>
            <Content />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export { Skills };

const getHighRelevanceSkills = (data) => {
  if (!data?.resume_json?.skills || !data?.score_json?.relevance?.skills)
    return [];
  const relevance = data.score_json.relevance.skills;
  const highSkills = data.resume_json.skills.filter(
    (skill) => relevance[skill] === 'high',
  );
  return highSkills.slice(0, 3); // Get top 3 high relevance skills
};

const Content = () => {
  const {
    details: { data, status },
  } = useApplication();
  if (status === 'pending')
    return (
      <Loader count={10}>
        <div className='relative w-[60px] h-[22px]'>
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
      <div className='flex flex-col items-center justify-center p-4'>
        <Medal className='text-gray-500 w-12 h-12 mb-2' />
        <p className='text-gray-600 text-sm'>No skills found</p>
      </div>
    );
  return <Skill />;
};

const Skill = () => {
  const {
    details: {
      data: {
        resume_json: { skills },
        score_json: {
          relevance: { skills: relevance },
        },
      },
    },
  } = useApplication();

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
        <div className='w-full mt-2'>
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
