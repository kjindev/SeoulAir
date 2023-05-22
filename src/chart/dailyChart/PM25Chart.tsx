import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function PM25Chart() {
  const [todayPM25, setTodayPM25] = useState<{ x: number; y: number }[]>([]);
  const [yesterdayPM25, setYesterdayPM25] = useState<
    { x: number; y: number }[]
  >([]);
  const [time, setTime] = useState<number[]>([]);
  const { todayState, yesterdayState } = useSelector((state: RootState) => {
    return state.data;
  });

  useEffect(() => {
    if (todayState) {
      let todayList: { x: number; y: number }[] = [];
      let timeList: number[] = [];
      for (let i = todayState.length - 1; i >= 0; i--) {
        todayList.push({
          x: Number(todayState[i].MSRDT.slice(8, 10)),
          y: todayState[i].PM25,
        });
        timeList.push(Number(todayState[i].MSRDT.slice(8, 10)));
      }
      setTodayPM25(todayList);
      setTime(timeList);
    }
  }, [todayState]);

  useEffect(() => {
    if (yesterdayState) {
      let yesterdayList: { x: number; y: number }[] = [];
      for (let i = yesterdayState.length - 1; i >= 0; i--) {
        yesterdayList.push({
          x: Number(yesterdayState[i].MSRDT.slice(8, 10)),
          y: yesterdayState[i].PM25,
        });
      }
      setYesterdayPM25(yesterdayList);
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
    },
    scales: {
      x: {
        display: false,
        max: 23,
      },
      y: {
        min: 0,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  const data = {
    labels: time,
    datasets: [
      {
        fill: true,
        label: "오늘",
        data: todayPM25,
        borderColor: "#581c87",
        backgroundColor: "#581c87",
        borderWidth: 3,
      },
      {
        fill: true,
        label: "어제",
        data: yesterdayPM25,
        borderColor: "#9ca3af",
        backgroundColor: "#9ca3af",
        borderWidth: 3,
      },
    ],
  };

  return (
    <div className="w-[100%] p-2 pl-3">
      <div className="w-[100%] py-2">
        <div className="text-sm text-center">초미세먼지 (단위: ㎍/㎥)</div>
      </div>
      <div className="w-[100%] h-[20vh]">
        <Scatter options={options} data={data} />
      </div>
    </div>
  );
}
