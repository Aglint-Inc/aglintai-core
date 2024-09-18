import AverageExperience from './AverageExperience';
import AverageTenure from './AverageTenure';
import CandidatesByExperienceChart from './CandidatesByExperienceChart';
import CandidatesByLocationChart from './CandidatesByLocationChart';
import CandidatesBySkillsChart from './CandidatesBySkillsChart';

export default function JobMetrics() {
  return (
    <>
      <CandidatesByLocationChart />
      <CandidatesBySkillsChart />
      <CandidatesByExperienceChart />
      <div className='flex-roe flex gap-4'>
        <AverageExperience />
        <AverageTenure />
      </div>
    </>
  );
}
