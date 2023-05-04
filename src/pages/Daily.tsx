import { useState, useEffect, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useRequest from "../hooks/useRequest";
import Modal from "./Modal";
import Location from "./Location";

const NO2Chart = lazy(() => import("../chart/dailyChart/NO2Chart"));
const PM25Chart = lazy(() => import("../chart/dailyChart/PM25Chart"));
const SO2Chart = lazy(() => import("../chart/dailyChart/SO2Chart"));
const PM10Chart = lazy(() => import("../chart/dailyChart/PM10Chart"));
const O3Chart = lazy(() => import("../chart/dailyChart/O3Chart"));
const DailyMap = lazy(() => import("../chart/maps/DailyMap"));

export default function Daily() {
  const [today, setToday] = useState("");
  const request = useRequest();
  const { todayDateState, yesterdayDateState, nameState } = useSelector(
    (state: RootState) => {
      return state.name;
    }
  );
  const todayState = useSelector((state: RootState) => {
    return state.data.todayState;
  });
  const locationState = useSelector((state: RootState) => {
    return state.name.locationState;
  });

  useEffect(() => {
    setToday(todayState[0]?.MSRDT);
  }, [todayState]);

  useEffect(() => {
    if (todayDateState.length !== 0) {
      request
        .updateData(todayDateState, "", nameState)
        .then(() => request.getData("today"))
        .then(() => request.updateData(yesterdayDateState, "", nameState))
        .then(() => request.getData("yesterday"))
        .catch((error) => console.log(error));
    }
  }, [todayDateState]);

  return (
    <div>
      <div className="pt-[5%] lg:pt-0 px-[5%] pb-5 w-[100%] flex flex-col md:flex-row justify-between items-center">
        <Modal />
        <div className="text-2xl"> | {nameState}의 실시간 대기 정보</div>
        <div>
          <span>({today?.slice(0, 4)}년 </span>
          <span>{today?.slice(4, 6)}월 </span>
          <span>{today?.slice(6, 8)}일 </span>
          <span>{today?.slice(8, 10)}시 기준)</span>
        </div>
      </div>
      <div className="w-[95vw] md:w-[85vw] flex flex-col justify-center items-center">
        <div className="w-[90%] flex flex-col lg:flex-row justify-between items-center">
          <div className="w-[100%] md:w-[50%] lg:w-[33%] lg:h-[45vh] lg:self-center mb-5 bg-white rounded-xl drop-shadow-md">
            <Suspense fallback={<div></div>}>
              <DailyMap />
            </Suspense>
          </div>
          <div className="w-[100%] lg:w-[65%] h-[45vh] flex justify-center lg:ml-5 mb-5 bg-white rounded-xl drop-shadow-md">
            <Suspense fallback={<div></div>}>
              <PM10Chart />
            </Suspense>
          </div>
        </div>
        <div className="w-[90%] flex flex-col lg:flex-row justify-between items-center">
          <div className="w-[100%] md:mb-5 lg:mb-0 lg:mr-3 lg:w-[42%] flex justify-between">
            <div className="w-[100%] mr-1 mb-5 md:mb-0 md:w-[48.5%] h-[27vh] flex justify-center bg-white rounded-xl drop-shadow-md">
              <Suspense fallback={<div></div>}>
                <SO2Chart />
              </Suspense>
            </div>
            <div className="w-[100%] ml-1 mb-5 md:mb-0 md:w-[48.5%] h-[27vh] flex justify-center bg-white rounded-xl drop-shadow-md">
              <Suspense fallback={<div></div>}>
                <NO2Chart />
              </Suspense>
            </div>
          </div>
          <div className="w-[100%] mb-5 lg:mb-0 lg:w-[30%] h-[27vh] flex justify-center bg-white rounded-xl drop-shadow-md">
            <Suspense fallback={<div></div>}>
              <O3Chart />
            </Suspense>
          </div>
          <div className="w-[100%] lg:w-[32%] lg:ml-3 lg:h-[27vh] flex justify-center bg-white rounded-xl drop-shadow-md">
            <Suspense fallback={<div></div>}>
              <PM25Chart />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
