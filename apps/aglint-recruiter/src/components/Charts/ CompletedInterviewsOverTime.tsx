// CompletedInterviewsOverTime.js
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shadcn/ui/card';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const CompletedInterviewsOverTime = () => {
  // Sample data for Completed Interviews Over Time
  const labels = [
    '2024-08-01',
    '2024-08-02',
    '2024-08-03',
    '2024-08-04',
    '2024-08-05',
    '2024-08-06',
    '2024-08-07',
    '2024-08-08',
    '2024-08-09',
    '2024-08-10',
  ];
  const data = [5, 7, 6, 8, 4, 9, 10, 6, 5, 7];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Completed Interviews',
        data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Interviews',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Card className='max-w-lg mx-auto mt-6 border border-border'>
      <CardHeader>
        <CardTitle className='text-md font-bold text-center'>Completed Interviews Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={chartData} options={options} />
      </CardContent>
    </Card>
  );
};

export default CompletedInterviewsOverTime;
