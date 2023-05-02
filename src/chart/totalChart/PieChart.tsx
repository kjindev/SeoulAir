import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const count = useSelector((state: RootState) => {
    return state.count;
  });
  const [countList, setCountList] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setCountList([
      count.code1State,
      count.code2State,
      count.code3State,
      count.code4State,
    ]);
  }, [count]);

  const options = {
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
    labels: ["좋음", "보통", "나쁨", "매우나쁨"],
    datasets: [
      {
        label: "미세먼지 상태",
        data: countList,
        backgroundColor: ["#e5e5e5", "#a3a3a3", "#525252", "#262626"],
      },
    ],
  };
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <Pie options={options} data={data} />
    </div>
  );
}
