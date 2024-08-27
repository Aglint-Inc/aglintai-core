import { Stack } from '@mui/material';
import {
  Chart as ChartJs,
  ChartData,
  ChartOptions,
  LinearScale,
} from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

ChartJs.register(LinearScale);

function LineGraph({
  lineData,
  maxMeetingCount,
}: {
  lineData: number[];
  maxMeetingCount: number;
}) {
  const data: ChartData<'line'> = {
    labels: Array(30).fill(''),
    // labels: Array(maxMeetingCount).fill(''),
    datasets: [
      {
        data: lineData,
        borderColor: '#F76B15',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        fill: true,
        backgroundColor(context) {
          const bgColor = ['#FEF0E7', 'white'];
          if (!context.chart.chartArea) return;
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(0, bgColor[0]);
          gradientBg.addColorStop(1, bgColor[1]);
          return gradientBg;
        },
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        max: maxMeetingCount,
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          display: false,
          stepSize: 2,
        },
        title: {
          display: false,
        },
      },
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        title: {
          display: false,
        },
      },
    },
  };

  return (
    <Stack width={'300px'} height={'40px'}>
      <Line data={data} options={options} />
    </Stack>
  );
}

export default LineGraph;
