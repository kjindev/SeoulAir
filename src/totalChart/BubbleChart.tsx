import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function BubbleChart() {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Red dataset",
        data: [
          { x: 1, y: 7, r: 5 },
          { x: 2, y: 10, r: 3 },
          { x: 3, y: 2, r: 9 },
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bubble options={options} data={data} />;
}
