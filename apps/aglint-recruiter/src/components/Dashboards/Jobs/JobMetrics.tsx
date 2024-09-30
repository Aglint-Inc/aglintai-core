import AverageExperience from './AverageExperience';
import AverageTenure from './AverageTenure';
import CandidatesByExperienceChart from './CandidatesByExperienceChart';
import CandidatesByLocationChart from './CandidatesByLocationChart';
import CandidatesBySkillsChart from './CandidatesBySkillsChart';
export default function JobMetrics() {
  return (
    <div className='container-lg mx-auto w-full px-4'>
      <h1 className='text-md mb-6 font-semibold'>Job Metrics Dashboard</h1>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <CandidatesByLocationChart />
        <CandidatesBySkillsChart />
        <CandidatesByExperienceChart />
        <div className='flex flex-col space-y-6'>
          <AverageExperience />
          <AverageTenure />
        </div>
      </div>
    </div>
  );
}
