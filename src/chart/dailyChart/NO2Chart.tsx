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
import { RootState } from "../../store/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

export default function NO2Chart() {
  const todayData = useSelector((state: RootState) => {
    return state.data.todayState;
  });
  const yesterdayData = useSelector((state: RootState) => {
    return state.data.yesterdayState;
  });

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
    labels: ["오늘", "어제"],
    datasets: [
      {
        data: [todayData[0]?.NO2, yesterdayData[0]?.NO2],
        backgroundColor: ["#fb923c", "#d6d3d1"],
        cutout: 45,
        borderWidth: [0, 5],
      },
    ],
  };

  return (
    <div className="w-[100%] p-1 flex flex-col justify-center items-center">
      <div className="w-[90%] h-[22vh] relative">
        <Doughnut options={options} data={data} />
        <div className="absolute top-[28%] left-[50%] translate-x-[-50%] translate-y-[50%] text-sm">
          <div className="text-xs text-center">NO2 농도</div>
          <div>{todayData[0]?.NO2}ppm</div>
        </div>
      </div>
    </div>
  );
}
