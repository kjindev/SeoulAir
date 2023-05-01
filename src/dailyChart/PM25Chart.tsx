import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { RootState } from "../store/store";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function PM25Chart() {
  const [todayPM25, setTodayPM25] = useState<{ x: number; y: number }[]>([]);
  const [yesterdayPM25, setYesterdayPM25] = useState<
    { x: number; y: number }[]
  >([]);
  const [time, setTime] = useState<number[]>([]);
  const todayData = useSelector((state: RootState) => {
    return state.data.todayState;
  });
  const yesterdayData = useSelector((state: RootState) => {
    return state.data.yesterdayState;
  });
  useEffect(() => {
    if (todayData) {
      let todayList: { x: number; y: number }[] = [];
      let timeList: number[] = [];
      for (let i = todayData.length - 1; i >= 0; i--) {
        todayList.push({
          x: Number(todayData[i].MSRDT.slice(8, 10)),
          y: todayData[i].PM25,
        });
        timeList.push(Number(todayData[i].MSRDT.slice(8, 10)));
      }
      setTodayPM25(todayList);
      setTime(timeList);
    }
  }, [todayData]);

  useEffect(() => {
    if (yesterdayData) {
      let yesterdayList: { x: number; y: number }[] = [];
      for (let i = yesterdayData.length - 1; i >= 0; i--) {
        yesterdayList.push({
          x: Number(yesterdayData[i].MSRDT.slice(8, 10)),
          y: yesterdayData[i].PM25,
        });
      }
      setYesterdayPM25(yesterdayList);
    }
  }, [yesterdayData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
        max: 24,
      },
      y: {
        min: 0,
        max: 70,
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
        label: "어제",
        data: yesterdayPM25,
        borderColor: "#fbbf24",
        backgroundColor: "#fbbf24",
        borderWidth: 3,
      },
      {
        fill: true,
        label: "오늘",
        data: todayPM25,
        borderColor: "#f97316",
        backgroundColor: "#f97316",
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
