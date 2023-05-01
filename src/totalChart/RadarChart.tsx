import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChart() {
  const [todayPM10, setTodayPM10] = useState<number[]>([]);
  const [todayPM25, setTodayPM25] = useState<number[]>([]);
  const todayData = useSelector((state: RootState) => {
    return state.data.todayState;
  });

  useEffect(() => {
    if (todayData.length !== 0) {
      let todayPM10List: number[] = [];
      let todayPM25List: number[] = [];
      for (let i = 5; i >= 0; i--) {
        todayPM10List.push(todayData[i].PM10);
        todayPM25List.push(todayData[i].PM25);
      }
      setTodayPM10(todayPM10List);
      setTodayPM25(todayPM25List);
    }
  }, [todayData]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      label: {
        display: false,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        min: 0,
        max: 30,
      },
    },
  };

  const data = {
    labels: [0, 1, 2, 3, 4, 5],
    datasets: [
      {
        label: "PM10",
        data: todayPM10,
        backgroundColor: "rgb(251, 191, 36, 0.3)",
        borderColor: "#fbbf24",
        borderWidth: 2,
      },
      {
        label: "PM25",
        data: todayPM25,
        backgroundColor: "rgb(248, 113, 113, 0.3)",
        borderColor: "#f87171",
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="mt-2 h-[100%] flex justify-center items-center">
      <Radar options={options} data={data} />
    </div>
  );
}
