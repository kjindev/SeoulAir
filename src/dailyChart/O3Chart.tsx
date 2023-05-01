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
  const dataList = useSelector((state: RootState) => {
    return state.data;
  });
  /*
  useEffect(() => {
    if (dataList) {
      let timeArray: string[] = [];
      for (let i = dataList.todayState.length - 1; i >= 0; i--) {
        timeArray.push(dataList.todayState[i].MSRDT.slice(8, 10));
      }
      setTime(timeArray);
    }
  }, [dataList]);

  useEffect(() => {
    if (time) {
      let todaylist: number[] = [];
      let yesterdaylist: number[] = [];
      for (let i = time.length - 1; i >= time.length - 5; i--) {
        todaylist?.push(dataList.todayState[i].O3);
        yesterdaylist?.push(dataList.yesterdayState[i].O3);
      }
      setTodayO3(todaylist);
      setYesterdayO3(yesterdaylist);
    }
  }, [time]);

  /*
  useEffect(() => {
    if (dataList) {
      let COlist: number[] = [];
      let O3list: number[] = [];
      let timeArray: string[] = [];
      for (let i = dataList.todayState.length - 1; i >= todayData.length - 5; i--) {
        O3list.push(todayData[i].O3);
        COlist.push(todayData[i].CO);
        timeArray.push(todayData[i].MSRDT.slice(8, 10) + "시");
      }
      setCOdata(COlist);
      setO3data(O3list);
      setTime(timeArray);
    }
  }, [dataList]);
*/
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
        //max: 30,
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
          최근 5시간 초미세먼지 (단위: ㎍/㎥)
        </div>
      </div>
      <div className="w-[100%] h-[20vh]">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
