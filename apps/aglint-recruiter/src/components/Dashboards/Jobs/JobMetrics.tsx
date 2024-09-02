import AverageExperience from './AverageExperience';
import AverageTenure from './AverageTenure';
import CandidatesByExperienceChart from './CandidatesByExperienceChart';
import CandidatesByLocationChart from './CandidatesByLocationChart';
import CandidatesBySkillsChart from './CandidatesBySkillsChart';
export default function JobMetrics() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-md font-semibold mb-6'>Job Metrics Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
