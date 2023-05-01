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
  const [average, setAverage] = useState("");
  const totalData = useSelector((state: RootState) => {
    return state.data.totalState;
  });

  useEffect(() => {
    if (totalData.length !== 0) {
      let sum: number = 0;
      let result: number = 1;
      for (let i = 0; i < totalData.length; i++) {
        sum = sum + totalData[i].O3;
      }
      result = sum / totalData.length;
      setAverage((Math.ceil(result * 1000) / 1000).toFixed(3));
    }
  }, [totalData]);

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
        data: [average, 0.1],
        backgroundColor: ["#fb923c", "#d6d3d1"],
        cutout: 20,
        borderWidth: [0, 5],
        rotation: -90,
        circumference: 180,
      },
    ],
  };

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <div className="w-[90%] h-[100%] relative p-5">
        <Doughnut options={options} data={data} />
        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[50%] text-sm">
          <div className="text-sm text-center">O3 평균 농도</div>
          <div className="text-center">{average}ppm</div>
        </div>
      </div>
    </div>
  );
}
