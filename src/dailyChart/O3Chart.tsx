import { useState, useEffect } from "react";
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
import { RootState } from "../store/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

export default function O3Chart() {
  const todayData = useSelector((state: RootState) => {
    return state.data.todayState;
  });
  const [O3data, setO3data] = useState(0);

  useEffect(() => {
    if (todayData) {
      setO3data(todayData[0]?.O3);
    }
  }, [todayData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        padding: 20,
      },
      title: {
        display: false,
        text: "O3",
      },
    },
    scales: {
      x: {
        display: false,
      },
    },
  };

  const data = {
    labels: ["O3", "평균"],
    datasets: [
      {
        data: [O3data, 0.023],
        backgroundColor: ["#fbbf24", "#d6d3d1"],
        rotation: -90,
        circumference: 180,
        cutout: 55,
        borderWidth: [0, 5],
      },
    ],
  };

  return (
    <div className="w-[100%] p-3 pl-5 flex flex-col justify-center items-center">
      <div className="text-sm py-2 text-center">O3 농도</div>
      <div className="w-[90%] h-[20vh] relative">
        <Doughnut options={options} data={data} />
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] text-sm">
          {O3data}ppm
        </div>
      </div>
    </div>
  );
}
