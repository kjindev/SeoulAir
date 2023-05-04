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

export default function PM10Chart() {
  const [todayPM10, setTodayPM10] = useState<number[]>([]);
  const [name, setName] = useState<string[]>([]);
  const totalData = useSelector((state: RootState) => {
    return state.data.totalState;
  });

  useEffect(() => {
    if (totalData.length !== 0) {
      let todayList: number[] = [];
      let nameList: string[] = [];
      let average: number = 1;
      let sum: number = 0;
      for (let i = 0; i < totalData.length; i++) {
        sum = sum + totalData[i].PM10;
      }
      average = sum / totalData.length;
      for (let i = 0; i < totalData.length; i++) {
        todayList.push(totalData[i].PM10 - average);
        nameList.push(totalData[i].MSRSTE_NM);
      }
      setTodayPM10(todayList);
      setName(nameList);
    }
  }, [totalData]);

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
    },
    responsiveAnimationDuration: 0,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        min: -10,
        max: 10,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  const labels = name;

  const data = {
    labels,
    datasets: [
      {
        label: "미세먼지",
        data: todayPM10,
        backgroundColor: "rgb(217, 119, 6, 0.9)",
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="w-[100%] h-[100%] py-2 px-3">
      <div className="w-[100%] text-center py-2">
        미세먼지 편차 (단위: ㎍/㎥)
      </div>
      <div className="h-[93%]">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
