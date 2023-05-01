import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function O3Chart() {
  const [yesterdayO3, setYesterdayO3] = useState<number[]>([]);
  const [todayO3, setTodayO3] = useState<number[]>([]);
  const [time, setTime] = useState<string[]>([]);
  const todayData = useSelector((state: RootState) => {
    return state.data.todayState;
  });

  const yesterdayData = useSelector((state: RootState) => {
    return state.data.yesterdayState;
  });

  useEffect(() => {
    if (todayData.length !== 0) {
      let todayO3List: number[] = [];
      let timeList: string[] = [];
      for (let i = 4; i >= 0; i--) {
        todayO3List.push(todayData[i].O3);
        timeList.push(todayData[i].MSRDT.slice(8, 10) + "시");
      }
      setTodayO3(todayO3List);
      setTime(timeList);
    }
  }, [todayData]);

  useEffect(() => {
    if (yesterdayData.length !== 0) {
      let yesterdayO3List: number[] = [];
      let timeList: string[] = [];
      for (let i = 4; i >= 0; i--) {
        yesterdayO3List.push(yesterdayData[i].O3);
        timeList.push(yesterdayData[i].MSRDT.slice(8, 10) + "시");
      }
      setYesterdayO3(yesterdayO3List);
    }
  }, [yesterdayData]);

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
        text: "오존 농도 (최근 5시간)",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 0.08,
        ticks: {
          stepSize: 0.02,
        },
      },
    },
  };

  const data = {
    labels: time,
    datasets: [
      {
        label: "CO",
        data: yesterdayO3,
        borderColor: "#fbbf24",
        backgroundColor: "#fbbf24",
      },
      {
        label: "O3",
        data: todayO3,
        borderColor: "#f97316",
        backgroundColor: "#f97316",
      },
    ],
  };
  return (
    <div className="w-[100%] p-2 pl-3">
      <div className="w-[100%] py-2">
        <div className="text-sm text-center">
          최근 5시간 오존 농도 (단위: ppm)
        </div>
      </div>
      <div className="w-[100%] h-[20vh]">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
