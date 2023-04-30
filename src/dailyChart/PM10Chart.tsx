import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PM10Chart() {
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
      for (let i = todayData.length - 1; i >= 0; i--) {
        todayPM10Array.push(todayData[i].PM10);
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
      for (let i = yesterdayData.length - 1; i >= 0; i--) {
        yesterdayPM10Array.push(yesterdayData[i].PM10);
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
        text: "미세먼지 농도",
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        min: 0,
        max: 70,
      },
    },
  };

  const data = {
    labels: time,
    datasets: [
      {
        label: "오늘",
        data: todayPM10,
        borderColor: "#f87171",
        backgroundColor: "#f87171",
        fill: 0,
      },
      {
        label: "어제",
        data: yesterdayPM10,
        borderColor: "#d6d3d1",
        backgroundColor: "#d6d3d1",
      },
    ],
  };
  return (
    <div className="w-[100%] p-3 pl-5">
      <div className="w-[100%] py-2 flex justify-between">
        <div className="text-sm"> 미세먼지 농도 (단위: ㎍/㎥)</div>
        <div className="px-2 text-xs">
          <span className="p-1 mr-1 bg-neutral-300 rounded-md">어제</span>
          <span className="p-1 bg-red-400 rounded-md">오늘</span>
        </div>
      </div>
      <div className="w-[100%] h-[35vh]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
