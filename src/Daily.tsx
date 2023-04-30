import COChart from "./dailyChart/COChart";
import NO2Chart from "./dailyChart/NO2Chart";
import O3Chart from "./dailyChart/O3Chart";
import PM10Chart from "./dailyChart/PM10Chart";
import PM25Chart from "./dailyChart/PM25Chart";
import Map from "./Map";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todayUpdate, yesterdayUpdate } from "./store/dataSlice";
import { RootState } from "./store/store";

export default function Daily() {
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => {
    return state.name.nameState;
  });
  const [date, setDate] = useState("");

  const getData = async (date: string) => {
    try {
      const response = await fetch(`http://localhost:4000/${date}`);
      const result = await response.json();
      if (date === "today") {
        dispatch(todayUpdate(result.TimeAverageAirQuality.row));
        setDate(result.TimeAverageAirQuality.row[0].MSRDT);
      } else if (date === "yesterday") {
        dispatch(yesterdayUpdate(result.TimeAverageAirQuality.row));
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateData = async (date: string, targetName: string | undefined) => {
    await fetch(`http://localhost:4000/${date}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: "",
        name: targetName,
      }),
    });
  };

  useEffect(() => {
    Promise.all([
      updateData("today", name),
      getData("today"),
      updateData("yesterday", name),
      getData("yesterday"),
    ]);
  }, [name]);

  return (
    <div>
      <div className="pt-[5%] lg:pt-0 px-[5%] pb-5 w-[100%] flex flex-col md:flex-row justify-between lg:items-center">
        <div className="text-2xl"> | {name}의 실시간 대기환경</div>
        <div className="text-sm">
          <span>({date.slice(0, 4)}년 </span>
          <span>{date.slice(4, 6)}월 </span>
          <span>{date.slice(6, 8)}일 </span>
          <span>{date.slice(8, 10)}시 기준)</span>
        </div>
      </div>
      <div className="w-[85vw] flex flex-col justify-center items-center">
        <div className="w-[90%] flex flex-col lg:flex-row justify-between items-center">
          <div className="w-[100%] md:w-[50%] lg:w-[33%] lg:self-center mb-5">
            <Map />
          </div>
          <div className="w-[100%] lg:w-[65%] lg:h-[45vh] flex justify-center lg:ml-5 mb-5 bg-white rounded-xl">
            <PM10Chart />
          </div>
        </div>
        <div className="w-[90%] flex flex-col lg:flex-row justify-between items-center">
          <div className="w-[100%] md:mb-5 lg:mb-0 lg:w-[70%] flex flex-col md:flex-row justify-between">
            <div className="w-[100%] mb-5 md:mb-0 md:w-[32%] h-[27vh] flex justify-center bg-white rounded-xl">
              <COChart />
            </div>
            <div className="w-[100%] mb-5 md:mb-0 md:w-[32%] h-[27vh] flex justify-center bg-white rounded-xl">
              <NO2Chart />
            </div>
            <div className="w-[100%] mb-5 md:mb-0 md:w-[32%] h-[27vh] flex justify-center bg-white rounded-xl">
              <O3Chart />
            </div>
          </div>
          <div className="w-[100%] lg:w-[30%] lg:ml-5 lg:h-[27vh] flex justify-center bg-white rounded-xl">
            <PM25Chart />
          </div>
        </div>
      </div>
    </div>
  );
}
