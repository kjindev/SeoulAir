import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function BubbleChart() {
  const [todayPM10, setTodayPM10] = useState<
    { x: number; y: number; r: number }[]
  >([]);
  const dataList = useSelector((state: RootState) => {
    return state.data.totalState;
  });

  useEffect(() => {
    if (dataList.length !== 0) {
      let todayPM10List: { x: number; y: number; r: number }[] = [];
      for (let i = dataList.length - 1; i >= 0; i--) {
        todayPM10List.push({
          x: dataList[i].PM10,
          y: dataList[i].NO2,
          r: dataList[i].PM25,
        });
      }
      setTodayPM10(todayPM10List);
    }
  }, [dataList]);

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
  };

  const data = {
    datasets: [
      {
        label: "Red dataset",
        data: todayPM10,
        radius: 0,
        backgroundColor: "rgb(217, 119, 6, 0.7)",
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className="w-[100%] h-[100%]">
      <div className="pt-3 text-center text-sm">
        미세먼지 - NO2 - 초미세먼지 상관관계
      </div>
      <div className="w-[100%] h-[90%] p-2 pt-0">
        <Bubble options={options} data={data} />
      </div>
    </div>
  );
}
