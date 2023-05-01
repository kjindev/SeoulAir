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

export default function PM25Chart() {
  const [yesterdayPM10, setYesterdayPM10] = useState<number[]>([]);
  const [todayPM10, setTodayPM10] = useState<number[]>([]);
  const [time, setTime] = useState<string[]>([]);
  const todayData = useSelector((state: RootState) => {
    return state.data.todayState;
  });

  const yesterdayData = useSelector((state: RootState) => {
    return state.data.yesterdayState;
  });

  useEffect(() => {
    if (todayData.length !== 0) {
      let todayPM10Array: number[] = [];
      let timeArray: string[] = [];
      for (let i = 4; i >= 0; i--) {
        todayPM10Array.push(todayData[i].PM25);
        timeArray.push(todayData[i].MSRDT.slice(8, 10) + "시");
      }
      setTodayPM10(todayPM10Array);
      setTime(timeArray);
    }
  }, [todayData]);

  useEffect(() => {
    if (yesterdayData.length !== 0) {
      let yesterdayPM10Array: number[] = [];
      let timeArray: string[] = [];
      for (let i = 4; i >= 0; i--) {
        yesterdayPM10Array.push(yesterdayData[i].PM25);
        timeArray.push(yesterdayData[i].MSRDT.slice(8, 10) + "시");
      }
      setYesterdayPM10(yesterdayPM10Array);
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
        text: "초미세먼지 농도 (최근 5시간)",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 30,
      },
    },
  };

  const data = {
    labels: time,
    datasets: [
      {
        label: "어제",
        data: yesterdayPM10,
        borderColor: "#fbbf24",
        backgroundColor: "#fbbf24",
      },
      {
        label: "오늘",
        data: todayPM10,
        borderColor: "#f97316",
        backgroundColor: "#f97316",
      },
    ],
  };
  return (
    <div className="w-[100%] p-2 pl-3">
      <div className="w-[100%] py-2">
        <div className="text-sm text-center">
          최근 5시간 초미세먼지 (단위: ㎍/㎥)
        </div>
      </div>
      <div className="w-[100%] h-[20vh]">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
