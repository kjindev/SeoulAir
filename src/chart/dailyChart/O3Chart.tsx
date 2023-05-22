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
import { RootState } from "../../store/store";

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
  const { todayState, yesterdayState } = useSelector((state: RootState) => {
    return state.data;
  });

  useEffect(() => {
    if (todayState.length !== 0) {
      let todayO3List: number[] = [];
      let timeList: string[] = [];
      for (let i = 4; i >= 0; i--) {
        todayO3List.push(todayState[i]?.O3);
        timeList.push(todayState[i]?.MSRDT.slice(8, 10) + "시");
      }
      setTodayO3(todayO3List);
      setTime(timeList);
    }
  }, [todayState]);

  useEffect(() => {
    if (yesterdayState.length !== 0) {
      let yesterdayO3List: number[] = [];
      for (let i = 4; i >= 0; i--) {
        yesterdayO3List.push(yesterdayState[i]?.O3);
      }
      setYesterdayO3(yesterdayO3List);
    }
  }, [yesterdayState]);

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
      },
      title: {
        display: false,
        text: "오존 농도 (최근 5시간)",
      },
    },
    scales: {
      y: {
        min: 0,
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
        label: "어제",
        data: yesterdayO3,
        borderWidth: 0,
        radius: 0,
        backgroundColor: "#9ca3af",
      },
      {
        label: "오늘",
        data: todayO3,
        borderWidth: 0,
        radius: 0,
        backgroundColor: "#581c87",
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
