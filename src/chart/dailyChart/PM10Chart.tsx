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
  const todayData = useSelector((state: RootState) => {
    return state.data.todayState;
  });
  const yesterdayData = useSelector((state: RootState) => {
    return state.data.yesterdayState;
  });

  useEffect(() => {
    if (todayData.length !== 0) {
      let todayList: number[] = [];
      let timeList: string[] = [];
      for (let i = todayData.length - 1; i >= 0; i--) {
        todayList.push(todayData[i].PM10);
        timeList.push(todayData[i].MSRDT.slice(8, 10) + "시");
      }
      setTodayPM10(todayList);
      setTime(timeList);
    }
  }, [todayData]);

  useEffect(() => {
    if (yesterdayData.length !== 0) {
      let yesterdayList: number[] = [];
      for (let i = yesterdayData.length - 1; i >= 0; i--) {
        yesterdayList.push(yesterdayData[i].PM10);
      }
      setYesterdayPM10(yesterdayList);
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
        borderColor: "#fbbf24",
        backgroundColor: "rgb(253, 224, 71, 0.3)",
      },
      {
        fill: true,
        label: "오늘",
        data: todayPM10,
        borderColor: "#f97316",
        backgroundColor: "rgb(249, 115, 22, 0.3)",
      },
    ],
  };
  return (
    <div className="w-[95%] p-3 pl-5">
      <div className="w-[100%] py-2 flex justify-between items-center">
        <div className="text-lg"> 미세먼지 (단위: ㎍/㎥)</div>
        <div className="px-2 text-xs">
          <span className="p-1 mr-1 bg-amber-300 rounded-md">어제</span>
          <span className="p-1 bg-orange-400 rounded-md">오늘</span>
        </div>
      </div>
      <div className="w-[100%] h-[35vh]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
