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
  const todayData = useSelector((state: RootState) => {
    return state.data.todayState;
  });
  const dataList = useSelector((state: RootState) => {
    return state.data.totalState;
  });

  useEffect(() => {
    if (todayData.length !== 0) {
      console.log(dataList);
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
  }, [todayData]);

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
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
        borderColor: "#f97316",
        backgroundColor: "rgb(249, 115, 22, 0.5)",
      },
    ],
  };
  return <Bubble options={options} data={data} />;
}
