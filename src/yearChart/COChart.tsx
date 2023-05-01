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

export default function COChart() {
  const todayData = useSelector((state: RootState) => {
    return state.data.todayState;
  });
  const yesterdayData = useSelector((state: RootState) => {
    return state.data.yesterdayState;
  });
  const [color, setColor] = useState("");

  useEffect(() => {
    if (todayData.length !== 0) {
      if (todayData[0]?.CO > yesterdayData[0]?.CO) {
        setColor("#ea580c");
      } else {
        setColor("#fb923c");
      }
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
        text: "CO",
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
        data: [todayData[0]?.CO, yesterdayData[0]?.CO],
        backgroundColor: [color, "#d6d3d1"],
        cutout: 60,
        borderWidth: [0, 5],
        rotation: -90,
        circumference: 180,
      },
    ],
  };

  return (
    <div className="w-[100%] p-1 flex flex-col justify-center items-center">
      <div className="w-[90%] h-[22vh] relative">
        <Doughnut options={options} data={data} />
        <div className="absolute top-[25%] left-[50%] translate-x-[-50%] translate-y-[50%] text-sm">
          <div className="text-sm text-center">CO 농도</div>
          <div>{todayData[0]?.CO}ppm</div>
        </div>
      </div>
    </div>
  );
}
