import NO2Chart from "../chart/dailyChart/NO2Chart";
import PM25Chart from "../chart/dailyChart/PM25Chart";
import SO2Chart from "../chart/dailyChart/SO2Chart";
import PM10Chart from "../chart/dailyChart/PM10Chart";
import O3Chart from "../chart/dailyChart/O3Chart";
import Map from "../chart/Map";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todayUpdate, yesterdayUpdate } from "../store/dataSlice";
import { RootState } from "../store/store";

export default function Daily() {
  const [today, setToday] = useState("");
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => {
    return state.name.nameState;
  });
  const date = useSelector((state: RootState) => {
    return state.name;
  });

  const getData = async (reqDate: string) => {
    try {
      const response = await fetch(
        "https://port-0-seoulair-server-3nec02mlh4e8glv.sel4.cloudtype.app/data"
      );
      const result = await response.json();
      if (reqDate === "today") {
        dispatch(todayUpdate(result.TimeAverageAirQuality.row));
        setToday(result.TimeAverageAirQuality.row[0].MSRDT);
      } else if (reqDate === "yesterday") {
        dispatch(yesterdayUpdate(result.TimeAverageAirQuality.row));
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateData = async (reqDate: string, reqName: string | undefined) => {
    await fetch(
      "https://port-0-seoulair-server-3nec02mlh4e8glv.sel4.cloudtype.app/data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: reqDate,
          time: "",
          name: reqName,
        }),
      }
    );
  };

  useEffect(() => {
    if (date.todayDateState.length !== 0) {
      updateData(date.todayDateState, name)
        .then(() => getData("today"))
        .then(() => updateData(date.yesterdayDateState, name))
        .then(() => getData("yesterday"))
        .catch((error) => console.log(error));
    }
  }, [date]);

  return (
    <div>
      <div className="pt-[5%] lg:pt-0 px-[5%] pb-5 w-[100%] flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl"> | {name}의 실시간 대기 정보</div>
        <div className="">
          <span>({today.slice(0, 4)}년 </span>
          <span>{today.slice(4, 6)}월 </span>
          <span>{today.slice(6, 8)}일 </span>
          <span>{today.slice(8, 10)}시 기준)</span>
        </div>
      </div>
      <div className="w-[95vw] md:w-[85vw] flex flex-col justify-center items-center">
        <div className="w-[90%] flex flex-col lg:flex-row justify-between items-center">
          <div className="w-[100%] md:w-[50%] lg:w-[33%] lg:h-[45vh] lg:self-center mb-5 bg-white rounded-xl">
            <Map />
          </div>
          <div className="w-[100%] lg:w-[65%] h-[45vh] flex justify-center lg:ml-5 mb-5 bg-white rounded-xl">
            <PM10Chart />
          </div>
        </div>
        <div className="w-[90%] flex flex-col lg:flex-row justify-between items-center">
          <div className="w-[100%] md:mb-5 lg:mb-0 lg:mr-3 lg:w-[42%] flex justify-between">
            <div className="w-[100%] mr-1 mb-5 md:mb-0 md:w-[48.5%] h-[27vh] flex justify-center bg-white rounded-xl">
              <SO2Chart />
            </div>
            <div className="w-[100%] ml-1 mb-5 md:mb-0 md:w-[48.5%] h-[27vh] flex justify-center bg-white rounded-xl">
              <NO2Chart />
            </div>
          </div>
          <div className="w-[100%] mb-5 lg:mb-0 lg:w-[30%] h-[27vh] flex justify-center bg-white rounded-xl">
            <O3Chart />
          </div>
          <div className="w-[100%] lg:w-[32%] lg:ml-3 lg:h-[27vh] flex justify-center bg-white rounded-xl">
            <PM25Chart />
          </div>
        </div>
      </div>
    </div>
  );
}
