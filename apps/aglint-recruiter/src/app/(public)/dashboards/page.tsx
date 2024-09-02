'use client';

import TrainingDashboard from '@/src/components/Reports/TrainingDashboard';

export default function ReportsPage() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
      {/* <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <InterviewersTrainingReport />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <TrainingCompletionRates />
      </div> */}
      <div className='col-span-1 md:col-span-2 lg:col-span-3'>
        <TrainingDashboard />
      </div>
      {/* <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <CompletedInterviewsOverTime />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <ConversionRateRadialChart />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-2">
        <JobDashboardChart />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <RequestTrend />
      </div>
      <div className="col-span-1">
        <UrgentVsStandard />
      </div>
      <div className="col-span-1">
        <RequestTypesDelaysChart />
      </div>
      <div className="col-span-1">
        <MonthlyRequestWorkloadChart />
      </div>
      <div className="col-span-1">
        <RequestHandlingOverQuartersChart />
      </div>
      <div className="col-span-1">
        <InterviewTypeDistribution />
      </div>
      <div className="col-span-1">
        <ConfirmationVsCompletion />
      </div> */}
    </div>
  );
}
