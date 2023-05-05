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
    labels: ["좋음", "보통", "나쁨", "매우나쁨"],
    datasets: [
      {
        label: "상태",
        data: countList,
        borderWidth: 1,
        backgroundColor: ["#cbd5e1", "#64748b", "#334155", "#0f172a"],
      },
    ],
  };
  return (
    <div className="w-[100%] h-[100%]">
      <div className="text-sm text-center pt-5">미세먼지 현황 통계</div>
      <div className="w-[100%] h-[80%] p-3">
        <Pie options={options} data={data} />
      </div>
    </div>
  );
}
