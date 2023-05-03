import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { RootState } from "../../store/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

export default function SO2Chart() {
  const { todayState } = useSelector((state: RootState) => {
    return state.data;
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
    },
    responsiveAnimationDuration: 0,
    plugins: {
      legend: {
        display: false,
        padding: 20,
      },
      title: {
        display: false,
        text: "SO2",
      },
    },
    scales: {
      x: {
        display: false,
      },
    },
  };

  const data = {
    labels: ["오늘", "연평균"],
    datasets: [
      {
        data: [todayState[0]?.SO2, 0.004],
        backgroundColor: ["#525252", "#a3a3a3"],
        cutout: 45,
        borderWidth: [0, 5],
      },
    ],
  };

  return (
    <div className="w-[100%] p-1 flex flex-col justify-center items-center">
      <div className="w-[90%] h-[22vh] relative">
        <Doughnut options={options} data={data} />
        <div className="absolute top-[32%] md:top-[28%] left-[50%] translate-x-[-50%] translate-y-[50%] text-sm">
          <div className="text-xs text-center">SO2 농도</div>
          <div>{todayState[0]?.SO2}ppm</div>
        </div>
      </div>
    </div>
  );
}
