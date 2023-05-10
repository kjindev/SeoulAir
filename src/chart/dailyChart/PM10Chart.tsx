import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function PM10Chart() {
  const [yesterdayPM10, setYesterdayPM10] = useState<number[]>([]);
  const [todayPM10, setTodayPM10] = useState<number[]>([]);
  const [time, setTime] = useState<string[]>([]);
  const { todayState, yesterdayState } = useSelector((state: RootState) => {
    return state.data;
  });

  useEffect(() => {
    if (todayState.length !== 0) {
      let todayList: number[] = [];
      let timeList: string[] = [];
      for (let i = todayState.length - 1; i >= 0; i--) {
        todayList.push(todayState[i].PM10);
        timeList.push(todayState[i].MSRDT.slice(8, 10) + "시");
      }
      setTodayPM10(todayList);
      setTime(timeList);
    }
  }, [todayState]);

  useEffect(() => {
    if (yesterdayState.length !== 0) {
      let yesterdayList: number[] = [];
      for (let i = yesterdayState.length - 1; i >= 0; i--) {
        yesterdayList.push(yesterdayState[i].PM10);
      }
      setYesterdayPM10(yesterdayList);
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
        text: "미세먼지 농도",
      },
    },
    scales: {
      x: {
        min: time[0],
        max: time[time?.length - 1],
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  const data = {
    labels: time,
    datasets: [
      {
        fill: true,
        label: "어제",
        data: yesterdayPM10,
        borderWidth: 2,
        radius: 2,
        borderColor: "#64748b",
        backgroundColor: "rgb(100, 116, 139, 0.3)",
      },
      {
        fill: true,
        label: "오늘",
        data: todayPM10,
        borderWidth: 2,
        radius: 2,
        borderColor: "#4c1d95",
        backgroundColor: "rgb(76, 29, 149, 0.5)",
      },
    ],
  };
  return (
    <div className="w-[95%] p-3 pl-5">
      <div className="w-[100%] py-2 flex justify-between items-center">
        <div className="text-lg"> 미세먼지 (단위: ㎍/㎥)</div>
        <div className="px-2 text-xs">
          <span className="p-1 mr-1 bg-gray-400 rounded-md">어제</span>
          <span className="p-1 bg-purple-900 text-white rounded-md">오늘</span>
        </div>
      </div>
      <div className="w-[100%] h-[35vh]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
